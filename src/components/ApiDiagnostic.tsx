import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, HelpCircle, X } from 'lucide-react';
import { GEMINI_API_KEY, GEMINI_MODEL, FEATURES } from '@/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ApiDiagnostic: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    details?: string;
  } | null>(null);

  const checkApiKey = () => {
    if (!GEMINI_API_KEY) {
      return {
        success: false,
        message: 'No API key found',
        details: 'Please set VITE_GEMINI_API_KEY in your .env file'
      };
    }

    if (GEMINI_API_KEY === 'YOUR_ACTUAL_GEMINI_API_KEY_HERE') {
      return {
        success: false,
        message: 'Default or placeholder API key detected',
        details: 'Please replace the placeholder API key with your actual Gemini API key'
      };
    }

    return {
      success: true,
      message: 'API key looks valid',
      details: `Key format check passed. Using key: ${GEMINI_API_KEY.substring(0, 5)}...`
    };
  };

  const testApiConnection = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      // First check if API key is valid
      const keyCheck = checkApiKey();
      if (!keyCheck.success) {
        setTestResult(keyCheck);
        setIsLoading(false);
        return;
      }

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

      // Send a simple test prompt
      const result = await model.generateContent('Hello, please respond with "API connection successful"');
      const response = result.response.text();

      setTestResult({
        success: true,
        message: 'API connection successful',
        details: `Response: ${response.slice(0, 100)}${response.length > 100 ? '...' : ''}`
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      let details = '';
      if (errorMessage.includes('quota')) {
        details = 'You have exceeded your API quota. Please check your billing settings in the Google AI Studio.';
      } else if (errorMessage.includes('rate limit')) {
        details = 'You have hit a rate limit. Please try again later.';
      } else if (errorMessage.includes('not found') || errorMessage.includes('invalid')) {
        details = 'Your API key may be invalid or you may not have access to the specified model.';
      } else if (errorMessage.includes('network')) {
        details = 'Network error. Please check your internet connection.';
      } else {
        details = errorMessage;
      }

      setTestResult({
        success: false,
        message: 'API connection failed',
        details
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          API Diagnostic Tool
        </CardTitle>
        <CardDescription>
          Test your Gemini API connection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Current Configuration:</h3>
            <ul className="text-sm space-y-1">
              <li><strong>API Key:</strong> {GEMINI_API_KEY ? `${GEMINI_API_KEY.substring(0, 5)}...` : 'Not set'}</li>
              <li><strong>Model:</strong> {GEMINI_MODEL} {FEATURES.USE_FLASH_MODEL ? '(Higher rate limits)' : '(Standard rate limits)'}</li>
              <li><strong>API Enabled:</strong> {FEATURES.USE_GEMINI_API ? 'Yes' : 'No'}</li>
              <li><strong>Debug Mode:</strong> {FEATURES.DEBUG_MODE ? 'Enabled' : 'Disabled'}</li>
            </ul>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100 text-xs">
            <h4 className="font-medium mb-1">Rate Limit Information:</h4>
            <p className="mb-2">Free tier Gemini API has the following limitations:</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>gemini-pro: 60 requests per minute</li>
              <li>gemini-2.0-flash: {FEATURES.USE_FLASH_MODEL ? <strong>120 requests per minute</strong> : '120 requests per minute'}</li>
              <li>Each API key has a daily quota</li>
              <li>The API implements automatic rate limiting</li>
            </ul>
            <p className="mt-2 italic">The application will automatically add delays between requests and retry when rate limited.</p>
          </div>

          {testResult && (
            <Alert variant={testResult.success ? "default" : "destructive"}>
              <div className="flex items-start">
                {testResult.success ? (
                  <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 mt-0.5 mr-2" />
                )}
                <div>
                  <AlertTitle>{testResult.message}</AlertTitle>
                  {testResult.details && (
                    <AlertDescription>
                      {testResult.details}
                    </AlertDescription>
                  )}
                </div>
              </div>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setTestResult(null)}>
          <X className="h-4 w-4 mr-2" />
          Clear
        </Button>
        <Button onClick={testApiConnection} disabled={isLoading}>
          {isLoading ? 'Testing...' : 'Test API Connection'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiDiagnostic; 