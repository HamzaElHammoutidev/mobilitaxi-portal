
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle size={60} className="text-green-500" />
            </div>
            <CardTitle>Registration Successful!</CardTitle>
            <CardDescription>
              Your account has been created successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Your account is now ready. You can start using our laundry services right away.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <h3 className="text-amber-800 font-medium mb-2">What's Next?</h3>
              <p className="text-amber-700 text-sm">
                Explore our services, schedule your first pickup, or set up your delivery preferences.
                We're here to make your laundry experience as smooth as possible.
              </p>
            </div>
            <p className="text-gray-600">
              You can now log in with your credentials and start using the app.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white">
              <Link to="/login">Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
