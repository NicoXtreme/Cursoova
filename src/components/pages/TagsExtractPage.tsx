import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Search, Copy, Download, Filter, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

export function TagsExtractPage() {
  const [inputText, setInputText] = useState('');
  const [url, setUrl] = useState('');
  const [extractedTags, setExtractedTags] = useState<Array<{tag: string, category: string, relevance: number}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  const mockExtractedTags = [
    { tag: 'artificial intelligence', category: 'Technology', relevance: 95 },
    { tag: 'machine learning', category: 'Technology', relevance: 88 },
    { tag: 'web development', category: 'Programming', relevance: 82 },
    { tag: 'react', category: 'Framework', relevance: 78 },
    { tag: 'javascript', category: 'Programming', relevance: 75 },
    { tag: 'frontend', category: 'Development', relevance: 72 },
    { tag: 'ui design', category: 'Design', relevance: 68 },
    { tag: 'user experience', category: 'Design', relevance: 65 },
    { tag: 'responsive design', category: 'Design', relevance: 62 },
    { tag: 'api integration', category: 'Backend', relevance: 58 }
  ];

  const categories = ['Technology', 'Programming', 'Framework', 'Development', 'Design', 'Backend'];

  const handleExtract = async () => {
    if (!inputText.trim() && !url.trim()) {
      toast.error('Please enter some text or URL to extract tags from');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setExtractedTags(mockExtractedTags);
      setIsLoading(false);
      toast.success('Tags extracted successfully!');
    }, 2000);
  };

  const filteredTags = filterCategory === 'all' 
    ? extractedTags 
    : extractedTags.filter(tag => tag.category === filterCategory);

  const copyTags = () => {
    const tagString = filteredTags.map(t => t.tag).join(', ');
    navigator.clipboard.writeText(tagString);
    toast.success('Tags copied to clipboard!');
  };

  const downloadTags = () => {
    const tagData = filteredTags.map(t => `${t.tag} (${t.category}, ${t.relevance}%)`).join('\n');
    const blob = new Blob([tagData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-tags.txt';
    a.click();
    toast.success('Tags downloaded!');
  };

  const clearAll = () => {
    setInputText('');
    setUrl('');
    setExtractedTags([]);
    setFilterCategory('all');
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Tag Extraction</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Extract relevant tags from your content using AI-powered analysis. Paste text or provide a URL to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Input Content</CardTitle>
            <CardDescription>
              Paste your text content or provide a URL to extract tags from
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url">URL (optional)</Label>
              <Input
                id="url"
                placeholder="https://example.com/article"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Text Content</Label>
              <Textarea
                id="content"
                placeholder="Paste your content here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
              />
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleExtract} disabled={isLoading} className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                {isLoading ? 'Extracting...' : 'Extract Tags'}
              </Button>
              <Button variant="outline" onClick={clearAll}>
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Extracted Tags</CardTitle>
                <CardDescription>
                  {filteredTags.length} tags found
                </CardDescription>
              </div>
              {extractedTags.length > 0 && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={copyTags}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadTags}>
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {extractedTags.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />

                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {filteredTags.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <span className="font-medium">{item.tag}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-muted-foreground">
                          {item.relevance}%
                        </div>
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${item.relevance}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {extractedTags.length === 0 && !isLoading && (
              <div className="text-center text-muted-foreground py-12">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter content above and click "Extract Tags" to get started</p>
              </div>
            )}

            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Analyzing content...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {extractedTags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tag Cloud</CardTitle>
            <CardDescription>Visual representation of extracted tags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {filteredTags.map((item, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  style={{ 
                    fontSize: `${Math.max(12, Math.min(18, item.relevance / 5))}px`,
                    opacity: item.relevance / 100
                  }}
                >
                  {item.tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}