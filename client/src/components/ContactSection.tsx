import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, MapPin, Clock, PhoneCall, Mail } from "lucide-react";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js/min";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(1, { message: "Street address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Please enter a valid zip code" }),

});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const [formSuccess, setFormSuccess] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const addressRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Common US street suffixes and states for suggestions
  const commonAddresses = [
    "123 Main St, Philadelphia, PA 19103",
    "456 Oak Ave, Trenton, NJ 08601",
    "789 Pine Blvd, Cherry Hill, NJ 08003",
    "101 Washington St, Princeton, NJ 08540",
    "202 Park Ave, Pittsburgh, PA 15222"
  ];
  
  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = new AsYouType('US').input(value);
    return phoneNumber;
  };
  
  // Handle address suggestions
  const handleAddressChange = (value: string) => {
    if (value.length > 3) {
      const filtered = commonAddresses.filter(addr => 
        addr.toLowerCase().includes(value.toLowerCase())
      );
      setAddressSuggestions(filtered);
      setShowAddressSuggestions(filtered.length > 0);
    } else {
      setShowAddressSuggestions(false);
    }
  };
  
  // Handle clicking outside suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowAddressSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Select address from suggestions
  const selectAddress = (address: string) => {
    const parts = address.split(',');
    if (parts.length >= 3) {
      const streetAddress = parts[0].trim();
      const city = parts[1].trim();
      const stateZip = parts[2].trim().split(' ');
      const state = stateZip[0].trim();
      const zipCode = stateZip[1]?.trim() || '';
      
      form.setValue('address', streetAddress);
      form.setValue('city', city);
      form.setValue('state', state);
      form.setValue('zipCode', zipCode);
      setShowAddressSuggestions(false);
    }
  };
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // In a real app, this would send the data to your backend
      // await apiRequest("POST", "/api/contact", data);
      setFormSuccess(true);
      
      toast({
        title: "Consultation Request Submitted",
        description: "We'll contact you shortly to schedule your free consultation.",
      });
      
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
            <h2 className="text-4xl font-bold text-[hsl(var(--dark))] mb-4">Request a Solar Consultation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Schedule your free, no-obligation consultation with SolarMan today!
            </p>
            <p className="mt-2 text-gray-500">
              We proudly serve homeowners across New Jersey and Pennsylvania.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">First Name*</FormLabel>
                          <FormControl>
                            <Input 
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
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Last Name*</FormLabel>
                          <FormControl>
                            <Input 
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email Address*</FormLabel>
                        <FormControl>
                          <Input 
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
                        <FormLabel className="text-gray-700 font-medium">Phone Number*</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="(555) 123-4567"
                            {...field} 
                            onChange={(e) => {
                              // Format phone number as you type
                              const formattedPhone = formatPhoneNumber(e.target.value);
                              field.onChange(formattedPhone);
                            }}
                          />
                        </FormControl>
                        <p className="text-xs text-gray-500 mt-1">
                          Will format as you type: (555) 123-4567
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="text-gray-700 font-medium">Street Address*</FormLabel>
                        <FormControl>
                          <div ref={suggestionsRef} className="relative w-full">
                            <Input 
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                              placeholder="123 Main St"
                              {...field} 
                              onChange={(e) => {
                                field.onChange(e);
                                handleAddressChange(e.target.value);
                              }}
                            />
                          </div>
                        </FormControl>
                        
                        {showAddressSuggestions && addressSuggestions.length > 0 && (
                          <div 
                            className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
                          >
                            {addressSuggestions.map((address, index) => (
                              <div 
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                                onClick={() => selectAddress(address)}
                              >
                                {address}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-xs text-gray-500 mt-1">
                          Type to get address suggestions
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">City*</FormLabel>
                          <FormControl>
                            <Input 
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
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">State*</FormLabel>
                          <FormControl>
                            <Input 
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
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Zip Code*</FormLabel>
                          <FormControl>
                            <Input 
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  

                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all"
                  >
                    Schedule My Consultation
                  </Button>
                </form>
              </Form>
              
              {formSuccess && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 text-xl mr-3" />
                    <div className="text-green-800 font-medium">Your consultation request has been received! We'll get back to you soon.</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col justify-between">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                  alt="SolarMan consultant ready to help" 
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
              

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
