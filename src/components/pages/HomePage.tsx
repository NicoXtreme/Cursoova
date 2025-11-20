import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tags, FileText, Video, TrendingUp } from 'lucide-react';

export function HomePage() {
  const stats = [
    {
      title: "Tags Extracted",
      value: "247",
      change: "+12%",
      icon: Tags,
      color: "text-blue-500"
    },
    {
      title: "Scripts Generated",
      value: "89",
      change: "+5%",
      icon: FileText,
      color: "text-green-500"
    },
    {
      title: "Videos Optimized",
      value: "134",
      change: "+18%",
      icon: Video,
      color: "text-purple-500"
    },
    {
      title: "Total Sessions",
      value: "1,247",
      change: "+7%",
      icon: TrendingUp,
      color: "text-orange-500"
    }
  ];

  const recentActivity = [
    { type: "extract", title: "Extracted tags from blog post", time: "2 hours ago" },
    { type: "generate", title: "Generated script for product demo", time: "4 hours ago" },
    { type: "optimize", title: "Optimized YouTube video metadata", time: "6 hours ago" },
    { type: "extract", title: "Processed article tags", time: "8 hours ago" }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome to Your Content Dashboard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Streamline your content creation workflow with AI-powered tag extraction, 
          script generation, and video optimization tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <Badge variant="secondary" className="text-xs">
                      {stat.change} from last week
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest content processing activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump to your most used tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left">
                <Tags className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Extract Tags</h3>
                <p className="text-sm text-muted-foreground">From text or URLs</p>
              </button>
              <button className="p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left">
                <Tags className="h-8 w-8 text-green-500 mb-2" />
                <h3 className="font-medium">Generate Tags</h3>
                <p className="text-sm text-muted-foreground">AI-powered suggestions</p>
              </button>
              <button className="p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left">
                <FileText className="h-8 w-8 text-blue-500 mb-2" />
                <h3 className="font-medium">Create Script</h3>
                <p className="text-sm text-muted-foreground">Generate content scripts</p>
              </button>
              <button className="p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left">
                <Video className="h-8 w-8 text-purple-500 mb-2" />
                <h3 className="font-medium">Optimize Video</h3>
                <p className="text-sm text-muted-foreground">YouTube metadata</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}