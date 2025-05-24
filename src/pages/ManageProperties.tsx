// src/pages/ManageProperties.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Property } from '@/types/Property';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const ManageProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching properties:', error.message);
      } else {
        setProperties(data || []);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-realtor-navy">Manage Properties</h1>
            <Link to="/admin/properties/new">
              <Button className="flex items-center gap-2 bg-realtor-gold text-realtor-navy">
                <Plus size={16} /> Add Property
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id}>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-bold text-lg text-realtor-navy">{property.title}</h3>
                  <p className="text-gray-600">{property.city}, {property.province}</p>
                  <p className="text-realtor-gold font-semibold">${property.price}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex gap-1">
                      <Pencil size={14} /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="flex gap-1">
                      <Trash2 size={14} /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManageProperties;
