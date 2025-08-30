import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { AdminProgram } from '@/types';
import { storageUtils } from '@/utils/localStorage';
import { useToast } from '@/components/ui/use-toast';

export function ProgramManagement() {
  const [programs, setPrograms] = useState<AdminProgram[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<AdminProgram | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    benefits: '',
    eligibilityIncome: '',
    eligibilityAge: '',
    eligibilityOther: '',
    applicationUrl: '',
    contactPhone: '',
    contactEmail: '',
    contactAddress: '',
    status: 'active' as 'active' | 'inactive' | 'draft'
  });
  const { toast } = useToast();

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = () => {
    setPrograms(storageUtils.getAdminPrograms());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const programData: AdminProgram = {
      id: editingProgram?.id || `admin_program_${Date.now()}`,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      benefits: formData.benefits.split('\n').filter(b => b.trim()),
      eligibility: {
        income: formData.eligibilityIncome,
        age: formData.eligibilityAge,
        other: formData.eligibilityOther.split('\n').filter(o => o.trim())
      },
      applicationUrl: formData.applicationUrl,
      contact: {
        phone: formData.contactPhone,
        email: formData.contactEmail,
        address: formData.contactAddress
      },
      status: formData.status,
      applicationsCount: editingProgram?.applicationsCount || 0,
      successRate: editingProgram?.successRate || 0,
      averageProcessingTime: editingProgram?.averageProcessingTime || 0,
      lastUpdated: new Date().toISOString(),
      createdBy: 'current_admin',
      isActive: formData.status === 'active'
    };

    const updatedPrograms = editingProgram
      ? programs.map(p => p.id === editingProgram.id ? programData : p)
      : [...programs, programData];

    setPrograms(updatedPrograms);
    storageUtils.saveAdminPrograms(updatedPrograms);

    toast({
      title: editingProgram ? "Program Updated" : "Program Created",
      description: `${formData.name} has been ${editingProgram ? 'updated' : 'created'} successfully.`,
    });

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      benefits: '',
      eligibilityIncome: '',
      eligibilityAge: '',
      eligibilityOther: '',
      applicationUrl: '',
      contactPhone: '',
      contactEmail: '',
      contactAddress: '',
      status: 'active'
    });
    setEditingProgram(null);
  };

  const handleEdit = (program: AdminProgram) => {
    setEditingProgram(program);
    setFormData({
      name: program.name,
      category: program.category,
      description: program.description,
      benefits: program.benefits.join('\n'),
      eligibilityIncome: program.eligibility.income,
      eligibilityAge: program.eligibility.age,
      eligibilityOther: program.eligibility.other.join('\n'),
      applicationUrl: program.applicationUrl,
      contactPhone: program.contact.phone,
      contactEmail: program.contact.email,
      contactAddress: program.contact.address,
      status: program.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (programId: string) => {
    const updatedPrograms = programs.filter(p => p.id !== programId);
    setPrograms(updatedPrograms);
    storageUtils.saveAdminPrograms(updatedPrograms);
    
    toast({
      title: "Program Deleted",
      description: "The program has been removed successfully.",
    });
  };

  const toggleStatus = (programId: string) => {
    const updatedPrograms = programs.map(p => 
      p.id === programId 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' as any, isActive: p.status !== 'active' }
        : p
    );
    setPrograms(updatedPrograms);
    storageUtils.saveAdminPrograms(updatedPrograms);

    toast({
      title: "Status Updated",
      description: "Program status has been changed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Program Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProgram ? 'Edit Program' : 'Create New Program'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Program Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="employment">Employment</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="childcare">Childcare</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="benefits">Benefits (one per line)</Label>
                <Textarea
                  id="benefits"
                  value={formData.benefits}
                  onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
                  rows={3}
                  placeholder="Enter each benefit on a new line"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eligibilityIncome">Income Requirements</Label>
                  <Input
                    id="eligibilityIncome"
                    value={formData.eligibilityIncome}
                    onChange={(e) => setFormData(prev => ({ ...prev, eligibilityIncome: e.target.value }))}
                    placeholder="e.g., Below 50% of AMI"
                  />
                </div>
                <div>
                  <Label htmlFor="eligibilityAge">Age Requirements</Label>
                  <Input
                    id="eligibilityAge"
                    value={formData.eligibilityAge}
                    onChange={(e) => setFormData(prev => ({ ...prev, eligibilityAge: e.target.value }))}
                    placeholder="e.g., 18-65"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="eligibilityOther">Other Requirements (one per line)</Label>
                <Textarea
                  id="eligibilityOther"
                  value={formData.eligibilityOther}
                  onChange={(e) => setFormData(prev => ({ ...prev, eligibilityOther: e.target.value }))}
                  rows={2}
                  placeholder="Enter each requirement on a new line"
                />
              </div>

              <div>
                <Label htmlFor="applicationUrl">Application URL</Label>
                <Input
                  id="applicationUrl"
                  value={formData.applicationUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, applicationUrl: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                    placeholder="(313) 555-0123"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="contact@program.gov"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'active' | 'inactive' | 'draft') => 
                      setFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="contactAddress">Contact Address</Label>
                <Textarea
                  id="contactAddress"
                  value={formData.contactAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactAddress: e.target.value }))}
                  rows={2}
                  placeholder="Street address, City, State, ZIP"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingProgram ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {programs.map((program) => (
          <Card key={program.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {program.name}
                    <Badge variant={program.status === 'active' ? 'default' : program.status === 'draft' ? 'secondary' : 'destructive'}>
                      {program.status}
                    </Badge>
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">{program.category}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(program)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleStatus(program.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(program.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium">Applications</p>
                  <p>{program.applicationsCount}</p>
                </div>
                <div>
                  <p className="font-medium">Success Rate</p>
                  <p>{program.successRate}%</p>
                </div>
                <div>
                  <p className="font-medium">Avg Processing</p>
                  <p>{program.averageProcessingTime} days</p>
                </div>
                <div>
                  <p className="font-medium">Last Updated</p>
                  <p>{new Date(program.lastUpdated).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}