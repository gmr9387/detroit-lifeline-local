import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  FileText, 
  Image, 
  Video, 
  Link,
  Eye,
  Calendar,
  User
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'faq' | 'guide' | 'announcement' | 'resource';
  content: string;
  summary: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
  publishedAt?: string;
  viewCount: number;
  featured: boolean;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  priority: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState('content');
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);
  const [isFaqDialogOpen, setIsFaqDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  
  const [contentForm, setContentForm] = useState({
    title: '',
    type: 'article' as ContentItem['type'],
    content: '',
    summary: '',
    status: 'draft' as ContentItem['status'],
    category: '',
    tags: '',
    featured: false
  });

  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: '',
    priority: 1,
    isActive: true
  });

  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = () => {
    // Load from localStorage or initialize with sample data
    const savedContent = localStorage.getItem('cms_content');
    const savedFaqs = localStorage.getItem('cms_faqs');

    if (savedContent) {
      setContentItems(JSON.parse(savedContent));
    } else {
      // Initialize with sample content
      const sampleContent: ContentItem[] = [
        {
          id: 'content_1',
          title: 'How to Apply for SNAP Benefits',
          type: 'guide',
          content: 'Step-by-step guide for applying to SNAP benefits...',
          summary: 'Complete guide for SNAP application process',
          status: 'published',
          category: 'Food Assistance',
          tags: ['SNAP', 'food', 'benefits'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          author: 'Admin',
          publishedAt: new Date().toISOString(),
          viewCount: 1250,
          featured: true
        },
        {
          id: 'content_2',
          title: 'Emergency Housing Resources in Detroit',
          type: 'resource',
          content: 'List of emergency housing resources available in Detroit...',
          summary: 'Emergency housing options and contact information',
          status: 'published',
          category: 'Housing',
          tags: ['housing', 'emergency', 'detroit'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          author: 'Admin',
          publishedAt: new Date().toISOString(),
          viewCount: 890,
          featured: false
        }
      ];
      setContentItems(sampleContent);
      localStorage.setItem('cms_content', JSON.stringify(sampleContent));
    }

    if (savedFaqs) {
      setFaqItems(JSON.parse(savedFaqs));
    } else {
      // Initialize with sample FAQs
      const sampleFaqs: FAQItem[] = [
        {
          id: 'faq_1',
          question: 'How long does it take to process my application?',
          answer: 'Most applications are processed within 30 days, but emergency cases may be expedited.',
          category: 'Application Process',
          priority: 1,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'faq_2',
          question: 'What documents do I need to apply?',
          answer: 'You will typically need proof of identity, income, and residency. Specific requirements vary by program.',
          category: 'Documentation',
          priority: 2,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      setFaqItems(sampleFaqs);
      localStorage.setItem('cms_faqs', JSON.stringify(sampleFaqs));
    }
  };

  const handleContentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const contentData: ContentItem = {
      id: editingContent?.id || `content_${Date.now()}`,
      title: contentForm.title,
      type: contentForm.type,
      content: contentForm.content,
      summary: contentForm.summary,
      status: contentForm.status,
      category: contentForm.category,
      tags: contentForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: editingContent?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: editingContent?.author || 'Admin',
      publishedAt: contentForm.status === 'published' && !editingContent?.publishedAt 
        ? new Date().toISOString() 
        : editingContent?.publishedAt,
      viewCount: editingContent?.viewCount || 0,
      featured: contentForm.featured
    };

    const updatedContent = editingContent
      ? contentItems.map(item => item.id === editingContent.id ? contentData : item)
      : [...contentItems, contentData];

    setContentItems(updatedContent);
    localStorage.setItem('cms_content', JSON.stringify(updatedContent));

    toast({
      title: editingContent ? "Content Updated" : "Content Created",
      description: `${contentForm.title} has been ${editingContent ? 'updated' : 'created'} successfully.`,
    });

    resetContentForm();
    setIsContentDialogOpen(false);
  };

  const handleFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const faqData: FAQItem = {
      id: editingFaq?.id || `faq_${Date.now()}`,
      question: faqForm.question,
      answer: faqForm.answer,
      category: faqForm.category,
      priority: faqForm.priority,
      isActive: faqForm.isActive,
      createdAt: editingFaq?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedFaqs = editingFaq
      ? faqItems.map(item => item.id === editingFaq.id ? faqData : item)
      : [...faqItems, faqData];

    setFaqItems(updatedFaqs);
    localStorage.setItem('cms_faqs', JSON.stringify(updatedFaqs));

    toast({
      title: editingFaq ? "FAQ Updated" : "FAQ Created",
      description: "FAQ has been saved successfully.",
    });

    resetFaqForm();
    setIsFaqDialogOpen(false);
  };

  const resetContentForm = () => {
    setContentForm({
      title: '',
      type: 'article',
      content: '',
      summary: '',
      status: 'draft',
      category: '',
      tags: '',
      featured: false
    });
    setEditingContent(null);
  };

  const resetFaqForm = () => {
    setFaqForm({
      question: '',
      answer: '',
      category: '',
      priority: 1,
      isActive: true
    });
    setEditingFaq(null);
  };

  const handleEditContent = (content: ContentItem) => {
    setEditingContent(content);
    setContentForm({
      title: content.title,
      type: content.type,
      content: content.content,
      summary: content.summary,
      status: content.status,
      category: content.category,
      tags: content.tags.join(', '),
      featured: content.featured
    });
    setIsContentDialogOpen(true);
  };

  const handleEditFaq = (faq: FAQItem) => {
    setEditingFaq(faq);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      priority: faq.priority,
      isActive: faq.isActive
    });
    setIsFaqDialogOpen(true);
  };

  const handleDeleteContent = (id: string) => {
    const updatedContent = contentItems.filter(item => item.id !== id);
    setContentItems(updatedContent);
    localStorage.setItem('cms_content', JSON.stringify(updatedContent));
    
    toast({
      title: "Content Deleted",
      description: "The content has been removed successfully.",
    });
  };

  const handleDeleteFaq = (id: string) => {
    const updatedFaqs = faqItems.filter(item => item.id !== id);
    setFaqItems(updatedFaqs);
    localStorage.setItem('cms_faqs', JSON.stringify(updatedFaqs));
    
    toast({
      title: "FAQ Deleted",
      description: "The FAQ has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="content">Articles & Guides</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Content Items</h3>
            <Dialog open={isContentDialogOpen} onOpenChange={setIsContentDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetContentForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingContent ? 'Edit Content' : 'Create New Content'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleContentSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={contentForm.title}
                        onChange={(e) => setContentForm(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={contentForm.type}
                        onValueChange={(value: ContentItem['type']) => 
                          setContentForm(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="article">Article</SelectItem>
                          <SelectItem value="faq">FAQ</SelectItem>
                          <SelectItem value="guide">Guide</SelectItem>
                          <SelectItem value="announcement">Announcement</SelectItem>
                          <SelectItem value="resource">Resource</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                      id="summary"
                      value={contentForm.summary}
                      onChange={(e) => setContentForm(prev => ({ ...prev, summary: e.target.value }))}
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={contentForm.content}
                      onChange={(e) => setContentForm(prev => ({ ...prev, content: e.target.value }))}
                      rows={8}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={contentForm.category}
                        onChange={(e) => setContentForm(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="e.g., Food Assistance"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={contentForm.tags}
                        onChange={(e) => setContentForm(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="tag1, tag2, tag3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={contentForm.status}
                        onValueChange={(value: ContentItem['status']) => 
                          setContentForm(prev => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={contentForm.featured}
                      onChange={(e) => setContentForm(prev => ({ ...prev, featured: e.target.checked }))}
                    />
                    <Label htmlFor="featured">Featured Content</Label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsContentDialogOpen(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      {editingContent ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {contentItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {item.title}
                        <Badge variant={item.status === 'published' ? 'default' : item.status === 'draft' ? 'secondary' : 'outline'}>
                          {item.status}
                        </Badge>
                        {item.featured && <Badge variant="secondary">Featured</Badge>}
                      </CardTitle>
                      <p className="text-muted-foreground mt-1">{item.summary}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditContent(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteContent(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {item.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {item.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {item.viewCount} views
                    </span>
                  </div>
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">FAQ Management</h3>
            <Dialog open={isFaqDialogOpen} onOpenChange={setIsFaqDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetFaqForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add FAQ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingFaq ? 'Edit FAQ' : 'Create New FAQ'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleFaqSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="question">Question</Label>
                    <Input
                      id="question"
                      value={faqForm.question}
                      onChange={(e) => setFaqForm(prev => ({ ...prev, question: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="answer">Answer</Label>
                    <Textarea
                      id="answer"
                      value={faqForm.answer}
                      onChange={(e) => setFaqForm(prev => ({ ...prev, answer: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="faqCategory">Category</Label>
                      <Input
                        id="faqCategory"
                        value={faqForm.category}
                        onChange={(e) => setFaqForm(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="e.g., Application Process"
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={faqForm.priority.toString()}
                        onValueChange={(value) => setFaqForm(prev => ({ ...prev, priority: parseInt(value) }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">High (1)</SelectItem>
                          <SelectItem value="2">Medium (2)</SelectItem>
                          <SelectItem value="3">Low (3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={faqForm.isActive}
                      onChange={(e) => setFaqForm(prev => ({ ...prev, isActive: e.target.checked }))}
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsFaqDialogOpen(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      {editingFaq ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {faqItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-base">{item.question}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-2">{item.answer}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Badge variant={item.isActive ? 'default' : 'secondary'}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => handleEditFaq(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteFaq(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Category: {item.category}</span>
                    <span>Priority: {item.priority}</span>
                    <span>Updated: {new Date(item.updatedAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Media Library</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-2">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">detroit-city.jpg</p>
              <p className="text-xs text-muted-foreground">2.1 MB</p>
            </Card>

            <Card className="p-4">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-2">
                <Video className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">how-to-apply.mp4</p>
              <p className="text-xs text-muted-foreground">15.3 MB</p>
            </Card>

            <Card className="p-4">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-2">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">application-form.pdf</p>
              <p className="text-xs text-muted-foreground">1.2 MB</p>
            </Card>

            <Card className="p-4 border-dashed border-2 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50">
              <Plus className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Upload new file</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}