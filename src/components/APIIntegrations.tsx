import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Globe,
  Database,
  Key,
  Zap,
  Clock,
  TrendingUp
} from 'lucide-react';
import { APIIntegration } from '@/types';
import { storageUtils } from '@/utils/localStorage';
import { useToast } from '@/components/ui/use-toast';

export function APIIntegrations() {
  const [integrations, setIntegrations] = useState<APIIntegration[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<APIIntegration | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'government' as APIIntegration['type'],
    endpoint: '',
    description: '',
    apiKey: '',
    config: '',
    isActive: true,
    rateLimitPerHour: 1000,
    timeoutMs: 30000
  });
  const { toast } = useToast();

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = () => {
    setIntegrations(storageUtils.getAPIIntegrations());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const integrationData: APIIntegration = {
      id: editingIntegration?.id || `api_${Date.now()}`,
      name: formData.name,
      type: formData.type,
      endpoint: formData.endpoint,
      description: formData.description,
      status: 'active',
      lastChecked: new Date().toISOString(),
      responseTime: Math.floor(Math.random() * 500) + 100, // Simulated response time
      uptime: editingIntegration?.uptime || 99.5,
      requestsToday: editingIntegration?.requestsToday || Math.floor(Math.random() * 1000),
      rateLimit: formData.rateLimitPerHour,
      lastError: editingIntegration?.lastError || null,
      isActive: formData.isActive,
      createdAt: editingIntegration?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      config: {
        timeout: formData.timeoutMs,
        retries: 3,
        authentication: 'API_KEY',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${formData.apiKey}`
        }
      },
      healthCheck: {
        url: `${formData.endpoint}/health`,
        method: 'GET',
        expectedStatus: 200
      }
    };

    const updatedIntegrations = editingIntegration
      ? integrations.map(i => i.id === editingIntegration.id ? integrationData : i)
      : [...integrations, integrationData];

    setIntegrations(updatedIntegrations);
    storageUtils.saveAPIIntegrations(updatedIntegrations);

    toast({
      title: editingIntegration ? "Integration Updated" : "Integration Created",
      description: `${formData.name} has been ${editingIntegration ? 'updated' : 'created'} successfully.`,
    });

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'government',
      endpoint: '',
      description: '',
      apiKey: '',
      config: '',
      isActive: true,
      rateLimitPerHour: 1000,
      timeoutMs: 30000
    });
    setEditingIntegration(null);
  };

  const handleEdit = (integration: APIIntegration) => {
    setEditingIntegration(integration);
    setFormData({
      name: integration.name,
      type: integration.type,
      endpoint: integration.endpoint,
      description: integration.description,
      apiKey: integration.config?.headers?.Authorization?.replace('Bearer ', '') || '',
      config: JSON.stringify(integration.config, null, 2),
      isActive: integration.isActive,
      rateLimitPerHour: integration.rateLimit,
      timeoutMs: integration.config?.timeout || 30000
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (integrationId: string) => {
    const updatedIntegrations = integrations.filter(i => i.id !== integrationId);
    setIntegrations(updatedIntegrations);
    storageUtils.saveAPIIntegrations(updatedIntegrations);
    
    toast({
      title: "Integration Deleted",
      description: "The API integration has been removed successfully.",
    });
  };

  const testConnection = async (integration: APIIntegration) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${integration.name}...`,
    });

    // Simulate API test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      const updatedIntegrations = integrations.map(i => 
        i.id === integration.id 
          ? { 
              ...i, 
              status: success ? 'active' : 'error',
              lastChecked: new Date().toISOString(),
              responseTime: success ? Math.floor(Math.random() * 500) + 100 : null,
              lastError: success ? null : 'Connection timeout'
            }
          : i
      );
      
      setIntegrations(updatedIntegrations);
      storageUtils.saveAPIIntegrations(updatedIntegrations);

      toast({
        title: success ? "Connection Successful" : "Connection Failed",
        description: success 
          ? `Successfully connected to ${integration.name}`
          : `Failed to connect to ${integration.name}. Check configuration.`,
        variant: success ? 'default' : 'destructive'
      });
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">API Integrations</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingIntegration ? 'Edit API Integration' : 'Create New API Integration'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Integration Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Government Benefits API"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: APIIntegration['type']) => setFormData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="notification">Notification</SelectItem>
                      <SelectItem value="verification">Verification</SelectItem>
                      <SelectItem value="third_party">Third Party</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="endpoint">API Endpoint</Label>
                <Input
                  id="endpoint"
                  value={formData.endpoint}
                  onChange={(e) => setFormData(prev => ({ ...prev, endpoint: e.target.value }))}
                  placeholder="https://api.michigan.gov/benefits"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this API integration does..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder="Enter API key..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rateLimitPerHour">Rate Limit (per hour)</Label>
                  <Input
                    id="rateLimitPerHour"
                    type="number"
                    value={formData.rateLimitPerHour}
                    onChange={(e) => setFormData(prev => ({ ...prev, rateLimitPerHour: parseInt(e.target.value) || 1000 }))}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="timeoutMs">Timeout (ms)</Label>
                  <Input
                    id="timeoutMs"
                    type="number"
                    value={formData.timeoutMs}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeoutMs: parseInt(e.target.value) || 30000 }))}
                    min="1000"
                    step="1000"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                />
                <Label htmlFor="isActive">Active Integration</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingIntegration ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Integration Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.length}</div>
            <p className="text-xs text-muted-foreground">
              {integrations.filter(i => i.isActive).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Requests</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.reduce((sum, i) => sum + (i.requestsToday || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+15%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(integrations.filter(i => i.responseTime).reduce((sum, i) => sum + (i.responseTime || 0), 0) / integrations.filter(i => i.responseTime).length || 0)}ms
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">-5ms</span> from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(integrations.reduce((sum, i) => sum + (i.uptime || 0), 0) / integrations.length || 0).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Integration List */}
      <div className="grid gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {integration.name}
                    <Badge variant={getStatusColor(integration.status)}>
                      {getStatusIcon(integration.status)}
                      {integration.status}
                    </Badge>
                    {!integration.isActive && (
                      <Badge variant="outline">Disabled</Badge>
                    )}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">{integration.description}</p>
                  <p className="text-sm text-muted-foreground">{integration.endpoint}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => testConnection(integration)}
                    disabled={!integration.isActive}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(integration)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(integration.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">Type</p>
                  <p className="capitalize">{integration.type.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Requests Today</p>
                  <p>{integration.requestsToday || 0}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Response Time</p>
                  <p>{integration.responseTime ? `${integration.responseTime}ms` : 'N/A'}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Uptime</p>
                  <p>{integration.uptime}%</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Last Checked</p>
                  <p>{new Date(integration.lastChecked).toLocaleTimeString()}</p>
                </div>
              </div>
              
              {integration.uptime && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Uptime</span>
                    <span>{integration.uptime}%</span>
                  </div>
                  <Progress value={integration.uptime} className="h-2" />
                </div>
              )}

              {integration.lastError && (
                <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-lg">
                  <p className="text-sm font-medium">Last Error:</p>
                  <p className="text-sm">{integration.lastError}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {integrations.length === 0 && (
        <Card className="p-8 text-center">
          <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No API Integrations</h3>
          <p className="text-muted-foreground mb-4">
            Get started by adding your first API integration to connect with external services.
          </p>
          <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Integration
          </Button>
        </Card>
      )}
    </div>
  );
}