
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const FindDoctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  // Sample doctors data - this will be replaced with real data from Supabase
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      experience: "15 years",
      rating: 4.9,
      location: "New York",
      availability: "Available Today",
      image: "/placeholder.svg",
      qualifications: ["MD", "FACC"],
      consultationFee: "$150"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Dermatology",
      experience: "12 years",
      rating: 4.8,
      location: "Los Angeles",
      availability: "Available Tomorrow",
      image: "/placeholder.svg",
      qualifications: ["MD", "FAAD"],
      consultationFee: "$120"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialization: "Pediatrics",
      experience: "10 years",
      rating: 4.9,
      location: "Chicago",
      availability: "Available Today",
      image: "/placeholder.svg",
      qualifications: ["MD", "FAAP"],
      consultationFee: "$100"
    },
    {
      id: 4,
      name: "Dr. David Wilson",
      specialization: "Orthopedics",
      experience: "18 years",
      rating: 4.7,
      location: "Houston",
      availability: "Available in 2 days",
      image: "/placeholder.svg",
      qualifications: ["MD", "AAOS"],
      consultationFee: "$180"
    }
  ];

  const specializations = [
    "All Specializations",
    "Cardiology",
    "Dermatology", 
    "Pediatrics",
    "Orthopedics",
    "Neurology",
    "Gynecology",
    "Psychiatry"
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === '' || 
                                 selectedSpecialization === 'All Specializations' ||
                                 doctor.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Doctors</h1>
          <p className="text-gray-600">Book appointments with verified healthcare professionals</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search doctors by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} 
            {selectedSpecialization && selectedSpecialization !== 'All Specializations' && 
              ` in ${selectedSpecialization}`}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <Card key={doctor.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover bg-gray-200"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{doctor.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {doctor.experience} experience
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {doctor.location}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {doctor.qualifications.map(qual => (
                    <Badge key={qual} variant="secondary" className="text-xs">
                      {qual}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-green-600">{doctor.consultationFee}</span>
                  <Badge variant={doctor.availability.includes('Today') ? 'default' : 'secondary'}>
                    {doctor.availability}
                  </Badge>
                </div>

                <Link to={`/book-appointment/${doctor.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Book Appointment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all doctors.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctors;
