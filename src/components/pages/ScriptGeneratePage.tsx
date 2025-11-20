import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { FileText, Download, Save, Copy, Wand2, RotateCcw } from 'lucide-react';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

export function ScriptGeneratePage() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState([5]);
  const [audience, setAudience] = useState('general');
  const [scriptType, setScriptType] = useState('presentation');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [customNotes, setCustomNotes] = useState('');

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
    { value: 'educational', label: 'Educational' }
  ];

  const audiences = [
    { value: 'general', label: 'General Public' },
    { value: 'professionals', label: 'Professionals' },
    { value: 'students', label: 'Students' },
    { value: 'executives', label: 'Executives' },
    { value: 'beginners', label: 'Beginners' },
    { value: 'experts', label: 'Experts' }
  ];

  const scriptTypes = [
    { value: 'presentation', label: 'Presentation' },
    { value: 'video', label: 'Video Script' },
    { value: 'podcast', label: 'Podcast' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'demo', label: 'Product Demo' },
    { value: 'tutorial', label: 'Tutorial' }
  ];

  const mockScript = `# Introduction

Welcome everyone to today's presentation on ${topic || 'our topic'}. I'm excited to share some insights that I believe will be valuable for all of you.

## Main Points

### Point 1: Understanding the Fundamentals
Let's start by exploring the core concepts that form the foundation of our discussion. This understanding is crucial as we move forward.

### Point 2: Practical Applications
Now that we've covered the basics, let's look at how these concepts apply in real-world scenarios. Here are some key examples:

- Example 1: Demonstrating practical implementation
- Example 2: Showing measurable results
- Example 3: Highlighting best practices

### Point 3: Future Considerations
Looking ahead, it's important to consider how these concepts will evolve and what that means for our approach.

## Conclusion

To summarize, we've covered the fundamental concepts, explored practical applications, and discussed future considerations. The key takeaway is that success comes from understanding these principles and applying them consistently.

Thank you for your attention, and I'd be happy to take any questions you might have.

---

*Script generated for ${audience} audience with a ${tone} tone. Estimated duration: ${length[0]} minutes.*`;

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic for your script');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedScript(mockScript);
      setIsLoading(false);
      toast.success('Script generated successfully!');
    }, 3000);
  };

  const copyScript = () => {
    navigator.clipboard.writeText(generatedScript);
    toast.success('Script copied to clipboard!');
  };

  const downloadScript = () => {
    const blob = new Blob([generatedScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '-').toLowerCase()}-script.txt`;
    a.click();
    toast.success('Script downloaded!');
  };

  const saveScript = () => {
    // Mock save functionality
    toast.success('Script saved to your library!');
  };

  const resetForm = () => {
    setTopic('');
    setTone('professional');
    setLength([5]);
    setAudience('general');
    setScriptType('presentation');
    setGeneratedScript('');
    setCustomNotes('');
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Script Generator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate professional scripts for presentations, videos, and more using AI-powered content creation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Script Parameters</CardTitle>
            <CardDescription>Configure your script settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic/Subject *</Label>
              <Input
                id="topic"
                placeholder="Enter your script topic..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Script Type</Label>
              <Select value={scriptType} onValueChange={setScriptType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {scriptTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((toneOption) => (
                    <SelectItem key={toneOption.value} value={toneOption.value}>
                      {toneOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {audiences.map((aud) => (
                    <SelectItem key={aud.value} value={aud.value}>
                      {aud.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Estimated Duration: {length[0]} minutes</Label>
              <Slider
                value={length}
                onValueChange={setLength}
                max={30}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any specific points or requirements..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleGenerate} disabled={isLoading} className="flex-1">
                <Wand2 className="h-4 w-4 mr-2" />
                {isLoading ? 'Generating...' : 'Generate'}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Script</CardTitle>
                <CardDescription>
                  {generatedScript ? 'Your AI-generated script is ready' : 'Configure parameters and generate your script'}
                </CardDescription>
              </div>
              {generatedScript && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={copyScript}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={saveScript}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadScript}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Generating your script...</p>
                <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
              </div>
            ) : generatedScript ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">
                    <FileText className="h-3 w-3 mr-1" />
                    {scriptType}
                  </Badge>
                  <Badge variant="secondary">{tone} tone</Badge>
                  <Badge variant="secondary">{audience} audience</Badge>
                  <Badge variant="secondary">{length[0]} min duration</Badge>
                </div>
                
                <div className="border rounded-lg p-4 bg-muted/20">
                  <Textarea
                    value={generatedScript}
                    onChange={(e) => setGeneratedScript(e.target.value)}
                    className="min-h-[500px] border-none bg-transparent resize-none font-mono text-sm"
                    placeholder="Your generated script will appear here..."
                  />
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Configure your script parameters and click "Generate" to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {generatedScript && (
        <Card>
          <CardHeader>
            <CardTitle>Script Enhancement</CardTitle>
            <CardDescription>Improve your script with AI suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 text-left">
                <div>
                  <h4 className="font-medium">Improve Clarity</h4>
                  <p className="text-sm text-muted-foreground">Make the script easier to understand</p>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 text-left">
                <div>
                  <h4 className="font-medium">Add Examples</h4>
                  <p className="text-sm text-muted-foreground">Include relevant examples and case studies</p>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 text-left">
                <div>
                  <h4 className="font-medium">Adjust Length</h4>
                  <p className="text-sm text-muted-foreground">Expand or condense the content</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}