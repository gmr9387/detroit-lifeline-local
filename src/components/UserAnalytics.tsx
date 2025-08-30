import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, 
  TrendingUp, 
  FileText, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Filter,
  Download
} from 'lucide-react';
import { SystemAnalytics, AdminUser } from '@/types';
import { storageUtils } from '@/utils/localStorage';

export function UserAnalytics() {
  const [analytics, setAnalytics] = useState<SystemAnalytics | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [timeRange, setTimeRange] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('applications');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    setAnalytics(storageUtils.getSystemAnalytics());
    setUsers(storageUtils.getAdminUsers());
  };

  const applicationTrendData = [
    { month: 'Jan', applications: 120, approved: 85, rejected: 25 },
    { month: 'Feb', applications: 145, approved: 102, rejected: 30 },
    { month: 'Mar', applications: 160, approved: 115, rejected: 35 },
    { month: 'Apr', applications: 180, approved: 140, rejected: 25 },
    { month: 'May', applications: 195, approved: 155, rejected: 30 },
    { month: 'Jun', applications: 210, approved: 170, rejected: 25 }
  ];

  const userDemographicsData = [
    { name: 'Single Adults', value: 35, color: '#0088FE' },
    { name: 'Families with Children', value: 45, color: '#00C49F' },
    { name: 'Seniors (65+)', value: 15, color: '#FFBB28' },
    { name: 'Students', value: 5, color: '#FF8042' }
  ];

  const programPopularityData = [
    { program: 'SNAP', applications: 450 },
    { program: 'Medicaid', applications: 380 },
    { program: 'Housing Assistance', applications: 320 },
    { program: 'WIC', applications: 280 },
    { program: 'TANF', applications: 220 },
    { program: 'Energy Assistance', applications: 180 }
  ];

  const successRateData = [
    { category: 'Housing', rate: 75 },
    { category: 'Food', rate: 85 },
    { category: 'Healthcare', rate: 90 },
    { category: 'Employment', rate: 65 },
    { category: 'Education', rate: 80 },
    { category: 'Utilities', rate: 88 }
  ];

  if (!analytics) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Analytics</h2>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applications">Applications</SelectItem>
              <SelectItem value="users">Users</SelectItem>
              <SelectItem value="programs">Programs</SelectItem>
              <SelectItem value="success">Success Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications Submitted</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overallSuccessRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageProcessingTime} days</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive">+2 days</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Application Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Application Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={applicationTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="applications" stroke="#0088FE" strokeWidth={2} />
              <Line type="monotone" dataKey="approved" stroke="#00C49F" strokeWidth={2} />
              <Line type="monotone" dataKey="rejected" stroke="#FF8042" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={userDemographicsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userDemographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Program Popularity */}
        <Card>
          <CardHeader>
            <CardTitle>Program Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={programPopularityData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="program" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="applications" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Success Rates by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Success Rates by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {successRateData.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-24 text-sm font-medium">{item.category}</div>
                <div className="flex-1">
                  <Progress value={item.rate} className="h-2" />
                </div>
                <div className="w-12 text-sm text-right">{item.rate}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">New application submitted</p>
                <p className="text-xs text-muted-foreground">SNAP application by John D. - 2 minutes ago</p>
              </div>
              <Badge variant="default">New</Badge>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-success" />
              <div className="flex-1">
                <p className="text-sm font-medium">Application approved</p>
                <p className="text-xs text-muted-foreground">Housing assistance for Sarah M. - 15 minutes ago</p>
              </div>
              <Badge variant="secondary">Approved</Badge>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div className="flex-1">
                <p className="text-sm font-medium">Application requires review</p>
                <p className="text-xs text-muted-foreground">WIC application by Maria G. - 1 hour ago</p>
              </div>
              <Badge variant="outline">Review</Badge>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">New user registration</p>
                <p className="text-xs text-muted-foreground">Robert L. completed onboarding - 2 hours ago</p>
              </div>
              <Badge variant="default">New User</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}