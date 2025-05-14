import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, MapPin, Clock, PhoneCall, Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  message: z.string().min(5, { message: "Message must be at least 5 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const [formSuccess, setFormSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await apiRequest("POST", "/api/contact", data);
      setFormSuccess(true);
      form.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormSuccess(false);
      }, 5000);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="section py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[hsl(var(--dark))] mb-4">Contact SolarMan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions or ready to start your solar journey? Reach out to our team today.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your email" 
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your phone number" 
                            type="tel"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What would you like to know?" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
              
              {formSuccess && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 text-xl mr-3" />
                    <div className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col justify-between">
              <div>
                <img 
                  src="https://pixabay.com/get/g92ade00044e32b25295131a9d4023b8f47c65910a03a4c8405cdcffda4f3077ee380b7427efeb48fc60ab9086ee76cd6e66b38ac547ea55956745707230740fd_1280.jpg" 
                  alt="SolarMan ready to help" 
                  className="rounded-xl shadow-lg mb-8"
                />
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-primary mb-2">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="font-medium">Service Areas</div>
                    <div className="text-gray-600 text-sm">New Jersey & Pennsylvania</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-primary mb-2">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="font-medium">Business Hours</div>
                    <div className="text-gray-600 text-sm">Mon-Fri: 8am-7pm<br/>Sat: 9am-5pm</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-primary mb-2">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div className="font-medium">Phone</div>
                    <div className="text-gray-600 text-sm">(555) 123-4567</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-primary mb-2">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-600 text-sm">info@solarman.com</div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-primary/10 p-5 rounded-xl">
                <CardContent className="p-0">
                  <div className="font-bold mb-2">Why Choose SolarMan?</div>
                  <p className="text-gray-700 mb-4">
                    We're committed to making solar energy accessible to everyone. No cash needed, no credit checks required.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-primary hover:text-primary/80">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="#" className="text-primary hover:text-primary/80">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                    </a>
                    <a href="#" className="text-primary hover:text-primary/80">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                    <a href="#" className="text-primary hover:text-primary/80">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
