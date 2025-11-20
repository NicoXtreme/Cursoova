import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Video, Eye, TrendingUp, Lightbulb, Copy, Save, RefreshCw, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function VideoOptimizePage() {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoTags, setVideoTags] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [optimizationScore, setOptimizationScore] = useState(0);
  const [suggestions, setSuggestions] = useState<Array<{type: string, title: string, description: string, impact: 'high' | 'medium' | 'low'}>>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const mockSuggestions = [
    {
      type: 'title',
      title: 'Optimize Title Length',
      description: 'Your title is too short. Aim for 50-60 characters for better SEO.',
      impact: 'high' as const
    },
    {
      type: 'description',
      title: 'Add Call-to-Action',
      description: 'Include subscribe prompts and social media links in your description.',
      impact: 'medium' as const
    },
    {
      type: 'tags',
      title: 'Include Long-tail Keywords',
      description: 'Add more specific, long-tail keywords to improve discoverability.',
      impact: 'high' as const
    },
    {
      type: 'seo',
      title: 'Keyword Placement',
      description: 'Include your main keyword in the first 125 characters of the description.',
      impact: 'high' as const
    }
  ];

  const optimizedSuggestions = {
    title: 'Complete Guide to AI Tools: Boost Productivity & Transform Your Workflow in 2024',
    description: `🚀 Discover the most powerful AI tools that can revolutionize your productivity and transform how you work in 2024!

In this comprehensive guide, I'll walk you through:
✅ Top 10 AI tools for content creation
✅ Automation tools that save hours daily
✅ AI-powered analytics and insights
✅ Cost-effective solutions for small businesses

🔥 TIMESTAMPS:
00:00 - Introduction
02:30 - Content Creation Tools
08:15 - Automation Platforms  
15:45 - Analytics & Insights
22:10 - Budget-Friendly Options
28:30 - Conclusion & Resources

💡 RESOURCES MENTIONED:
- Free AI tools checklist: [link]
- Productivity templates: [link]
- Join our community: [link]

👍 LIKE this video if it helped you discover new AI tools!
🔔 SUBSCRIBE for weekly productivity tips and tech reviews
💬 COMMENT below with your favorite AI tool

#AITools #Productivity #TechReview #Automation #WorkflowOptimization

Connect with me:
📧 Email: contact@example.com
🐦 Twitter: @example
📱 LinkedIn: linkedin.com/in/example`,
    tags: 'AI tools, productivity, automation, workflow optimization, tech review, artificial intelligence, business tools, content creation, 2024 trends, digital transformation'
  };

  const handleOptimize = async () => {
    if (!videoTitle.trim() && !videoDescription.trim() && !videoUrl.trim()) {
      toast.error('Please provide at least a title, description, or video URL to optimize');
      return;
    }

    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      const score = Math.floor(Math.random() * 30) + 60; // Score between 60-90
      setOptimizationScore(score);
      setSuggestions(mockSuggestions);
      setIsOptimizing(false);
      toast.success('Video optimization analysis complete!');
    }, 3000);
  };

  const applyOptimizations = () => {
    setVideoTitle(optimizedSuggestions.title);
    setVideoDescription(optimizedSuggestions.description);
    setVideoTags(optimizedSuggestions.tags);
    setOptimizationScore(95);
    toast.success('Optimizations applied successfully!');
  };

  const copyMetadata = () => {
    const metadata = `Title: ${videoTitle}\n\nDescription: ${videoDescription}\n\nTags: ${videoTags}`;
    navigator.clipboard.writeText(metadata);
    toast.success('Metadata copied to clipboard!');
  };

  const saveOptimization = () => {
    toast.success('Video optimization saved!');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Video Optimization</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Optimize your YouTube video metadata with AI-powered suggestions to improve visibility and engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Video Metadata</CardTitle>
            <CardDescription>Enter your video information for optimization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url">Video URL (optional)</Label>
              <Input
                id="url"
                placeholder="https://youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Video Title</Label>
              <Input
                id="title"
                placeholder="Enter your video title..."
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{videoTitle.length} characters</span>
                <span>Recommended: 50-60 characters</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Video Description</Label>
              <Textarea
                id="description"
                placeholder="Enter your video description..."
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{videoDescription.length} characters</span>
                <span>First 125 characters are most important</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Textarea
                id="tags"
                placeholder="Enter tags separated by commas..."
                value={videoTags}
                onChange={(e) => setVideoTags(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleOptimize} disabled={isOptimizing} className="flex-1">
                <TrendingUp className="h-4 w-4 mr-2" />
                {isOptimizing ? 'Analyzing...' : 'Analyze & Optimize'}
              </Button>
              <Button variant="outline" onClick={copyMetadata}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Score</CardTitle>
            <CardDescription>SEO and engagement potential analysis</CardDescription>
          </CardHeader>
          <CardContent>
            {optimizationScore > 0 ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`text-6xl font-bold ${getScoreColor(optimizationScore)}`}>
                    {optimizationScore}
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {getScoreLabel(optimizationScore)}
                  </p>
                  <Progress value={optimizationScore} className="mt-4" />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Optimization Breakdown</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Title Optimization</span>
                      <Badge variant="secondary">{videoTitle.length > 50 ? '85%' : '60%'}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Description Quality</span>
                      <Badge variant="secondary">{videoDescription.length > 250 ? '90%' : '45%'}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tag Relevance</span>
                      <Badge variant="secondary">{videoTags.length > 100 ? '80%' : '50%'}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SEO Readiness</span>
                      <Badge variant="secondary">75%</Badge>
                    </div>
                  </div>
                </div>

                <Button onClick={applyOptimizations} className="w-full">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Apply AI Optimizations
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                {isOptimizing ? (
                  <>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Analyzing your video metadata...</p>
                  </>
                ) : (
                  <>
                    <Video className="h-12 w-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
                    <p className="text-muted-foreground">Enter your video details and click "Analyze" to get optimization suggestions</p>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Optimization Suggestions
            </CardTitle>
            <CardDescription>AI-powered recommendations to improve your video performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="p-4 rounded-lg border bg-muted/20">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{suggestion.title}</h4>
                    <Badge className={`text-xs ${getImpactColor(suggestion.impact)}`}>
                      {suggestion.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {optimizationScore > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Result Preview</CardTitle>
            <CardDescription>How your video will appear in YouTube search results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-muted/20">
              <div className="flex space-x-4">
                <div className="w-32 h-18 bg-muted rounded flex items-center justify-center">
                  <Video className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium text-blue-600 hover:underline cursor-pointer line-clamp-2">
                    {videoTitle || 'Your Video Title Will Appear Here'}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Channel Name</span>
                    <span>•</span>
                    <span>1.2K views</span>
                    <span>•</span>
                    <span>2 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {videoDescription.substring(0, 150) || 'Your video description preview will appear here...'}
                    {videoDescription.length > 150 && '...'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}