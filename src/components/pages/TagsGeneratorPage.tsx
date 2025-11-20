import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { Sparkles, Copy, Shuffle, Save, Plus, X, Lightbulb } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { toast } from 'sonner@2.0.3';

export function TagsGeneratorPage() {
  const [keywords, setKeywords] = useState('');
  const [industry, setIndustry] = useState('general');
  const [tagCount, setTagCount] = useState([10]);
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customTag, setCustomTag] = useState('');

  const industries = [
    { value: 'general', label: 'General' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'travel', label: 'Travel' },
    { value: 'fitness', label: 'Fitness & Health' }
  ];

  const tips = [
    "Use specific keywords related to your content",
    "Mix broad and niche terms for better reach",
    "Consider seasonal or trending topics",
    "Include action words and descriptive adjectives",
    "Research competitor tags for inspiration"
  ];

  const mockGeneratedTags = [
    'artificial intelligence', 'machine learning', 'deep learning', 'neural networks',
    'data science', 'automation', 'algorithms', 'big data', 'predictive analytics',
    'natural language processing', 'computer vision', 'robotics', 'cloud computing',
    'digital transformation', 'innovation', 'future technology', 'ai development',
    'smart systems', 'intelligent automation', 'cognitive computing'
  ];

  const handleGenerate = async () => {
    if (!keywords.trim()) {
      toast.error('Please enter some keywords to generate tags');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const shuffledTags = [...mockGeneratedTags].sort(() => 0.5 - Math.random());
      setGeneratedTags(shuffledTags.slice(0, tagCount[0]));
      setIsLoading(false);
      toast.success('Tags generated successfully!');
    }, 2000);
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag('');
      toast.success('Custom tag added!');
    }
  };

  const removeSelectedTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const copySelectedTags = () => {
    const tagString = selectedTags.join(', ');
    navigator.clipboard.writeText(tagString);
    toast.success('Selected tags copied to clipboard!');
  };

  const saveTagCollection = () => {
    // Mock save functionality
    toast.success('Tag collection saved!');
  };

  const regenerateTags = () => {
    if (generatedTags.length > 0) {
      const shuffledTags = [...mockGeneratedTags].sort(() => 0.5 - Math.random());
      setGeneratedTags(shuffledTags.slice(0, tagCount[0]));
      toast.success('Tags regenerated!');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Tag Generator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate relevant tags using AI-powered suggestions based on your keywords and industry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Tags</CardTitle>
              <CardDescription>
                Enter your keywords and preferences to generate relevant tags
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="Enter keywords separated by commas..."
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind.value} value={ind.value}>
                          {ind.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Number of Tags: {tagCount[0]}</Label>
                  <Slider
                    value={tagCount}
                    onValueChange={setTagCount}
                    max={30}
                    min={5}
                    step={5}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button onClick={handleGenerate} disabled={isLoading} className="flex-1">
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isLoading ? 'Generating...' : 'Generate Tags'}
                </Button>
                {generatedTags.length > 0 && (
                  <Button variant="outline" onClick={regenerateTags}>
                    <Shuffle className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {generatedTags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Tags</CardTitle>
                <CardDescription>
                  Click on tags to add them to your selection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {generatedTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant={selectedTags.includes(tag) ? "default" : "secondary"}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                      {selectedTags.includes(tag) && (
                        <X className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {isLoading && (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Generating tags...</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selected Tags ({selectedTags.length})</CardTitle>
              <CardDescription>Your curated tag collection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add custom tag..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={addCustomTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {selectedTags.map((tag, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/50">
                      <span className="text-sm">{tag}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeSelectedTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                {selectedTags.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <p>No tags selected yet</p>
                  </div>
                )}

                {selectedTags.length > 0 && (
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={copySelectedTags} className="flex-1">
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button size="sm" variant="outline" onClick={saveTagCollection} className="flex-1">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}