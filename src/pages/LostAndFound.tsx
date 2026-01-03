import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Calendar, Tag, AlertCircle, CheckCircle2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const items = [
    {
        id: 1,
        title: "MacBook Pro Charger",
        type: "Lost",
        category: "Electronics",
        location: "Library, 2nd Floor",
        date: "2024-03-10",
        status: "Open",
        image: "https://images.unsplash.com/photo-1625295988185-13f56b772554?auto=format&fit=crop&q=80&w=800",
        description: "Lost my white MacBook charger near the quiet study area. It has a sticker on the brick."
    },
    {
        id: 2,
        title: "Blue Hydro Flask",
        type: "Found",
        category: "Accessories",
        location: "Gym Area",
        date: "2024-03-09",
        status: "Open",
        image: "https://images.unsplash.com/photo-1602143407151-cd111bb621a4?auto=format&fit=crop&q=80&w=800",
        description: "Found a blue water bottle on the bench press rack. Left it at the front desk."
    },
    {
        id: 3,
        title: "Student ID Card",
        type: "Lost",
        category: "Documents",
        location: "Cafeteria",
        date: "2024-03-08",
        status: "Resolved",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800", // Generic image
        description: "Dropped my ID card somewhere during lunch. Name: Sarah J."
    },
    {
        id: 4,
        title: "Black Umbrella",
        type: "Found",
        category: "Accessories",
        location: "Building C Entrance",
        date: "2024-03-11",
        status: "Open",
        image: "https://images.unsplash.com/photo-1518134018617-6412f6a6ae55?auto=format&fit=crop&q=80&w=800",
        description: "Found a large black umbrella leaning against the wall near the main doors."
    },
    {
        id: 5,
        title: "Calculus Textbook",
        type: "Lost",
        category: "Books",
        location: "Room 304",
        date: "2024-03-07",
        status: "Open",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
        description: "Left my Calculus Vol. 2 book on the desk in the front row."
    },
    {
        id: 6,
        title: "AirPods Case",
        type: "Found",
        category: "Electronics",
        location: "Student Center",
        date: "2024-03-10",
        status: "Open",
        image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&q=80&w=800",
        description: "Found a white AirPods case with a cute cat keychain."
    }
];

export const LostAndFound = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = items.filter(item => {
        const matchesTab = activeTab === "All" ? true : item.type === activeTab;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navigation />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
                <div className="absolute top-0 left-0 -ml-20 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <ScrollReveal>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md">
                            <AlertCircle className="h-4 w-4 text-primary animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Community Support</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
                            Lost & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Found</span>
                        </h1>
                        <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                            Reuniting lost items with their owners. Report lost belongings or help the community by posting found items.
                        </p>

                        <div className="flex justify-center gap-4">
                            <Button size="lg" className="rounded-full h-14 px-8 text-base font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20">
                                <Plus className="h-5 w-5 mr-2" />
                                Report an Item
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-12 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                        <Tabs defaultValue="All" className="w-full md:w-auto" onValueChange={setActiveTab}>
                            <TabsList className="bg-foreground/5 border border-foreground/10 rounded-full h-14 p-1 inline-flex w-full md:w-auto">
                                {["All", "Lost", "Found"].map((tab) => (
                                    <TabsTrigger
                                        key={tab}
                                        value={tab}
                                        className="rounded-full px-8 h-12 font-bold text-xs uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-white transition-all flex-1 md:flex-none"
                                    >
                                        {tab}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>

                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search items..."
                                className="h-14 pl-12 rounded-full bg-foreground/[0.03] border-foreground/10 focus-visible:ring-primary/50 text-base"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item, index) => (
                            <ScrollReveal key={item.id} delay={index * 0.05}>
                                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                                    <Card className="bg-foreground/[0.02] border-foreground/10 backdrop-blur-sm overflow-hidden rounded-[2rem] hover:border-primary/20 transition-all duration-300 group h-full flex flex-col">
                                        <div className="relative h-56 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <Badge variant={item.type === 'Lost' ? 'destructive' : 'default'} className="px-3 py-1 font-bold uppercase tracking-wider text-[10px] shadow-lg">
                                                    {item.type}
                                                </Badge>
                                            </div>
                                            <div className="absolute top-4 right-4 z-20">
                                                {item.status === 'Resolved' && (
                                                    <Badge variant="secondary" className="bg-green-500/90 text-white border-0 px-3 py-1 font-bold uppercase tracking-wider text-[10px] shadow-lg flex items-center gap-1">
                                                        <CheckCircle2 className="h-3 w-3" /> Resolved
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <CardContent className="p-6 flex-1 space-y-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge variant="outline" className="text-[10px] border-foreground/20 text-foreground/60">{item.category}</Badge>
                                                    <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">• {item.date}</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-start text-foreground/60 text-sm font-medium">
                                                    <MapPin className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                                                    {item.location}
                                                </div>
                                                <p className="text-foreground/50 text-sm leading-relaxed line-clamp-2">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="p-6 pt-0">
                                            <Button variant="outline" className="w-full h-12 rounded-xl border-foreground/10 hover:bg-primary hover:text-white hover:border-primary font-bold tracking-wide transition-all">
                                                Contact {item.type === 'Lost' ? 'Owner' : 'Finder'}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20 opacity-50">
                            <div className="w-20 h-20 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="h-10 w-10 text-foreground/40" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">No items found</h3>
                            <p className="text-foreground/60">Try adjusting your search terms or filters.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};
