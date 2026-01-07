import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Calendar, AlertCircle, CheckCircle2, Plus, Loader2, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const initialItems = [
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
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
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
    const [items, setItems] = useState(initialItems);
    const [activeTab, setActiveTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Contact Dialog States
    const [contactItem, setContactItem] = useState<any>(null);
    const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
    const [isContactSubmitting, setIsContactSubmitting] = useState(false);
    const [contactForm, setContactForm] = useState({
        message: "",
        contactInfo: ""
    });

    const [newItem, setNewItem] = useState({
        title: "",
        type: "Lost",
        category: "Electronics",
        location: "",
        date: new Date().toISOString().split('T')[0],
        description: "",
        image: "" // Optional: In a real app, this would be a file upload
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const item = {
                id: items.length + 1,
                ...newItem,
                status: "Open",
                image: newItem.image || "https://images.unsplash.com/photo-1555664424-778a1e501b0d?auto=format&fit=crop&q=80&w=800" // Default image
            };

            setItems([item, ...items]);
            setIsSubmitting(false);
            setIsDialogOpen(false);
            setNewItem({
                title: "",
                type: "Lost",
                category: "Electronics",
                location: "",
                date: new Date().toISOString().split('T')[0],
                description: "",
                image: ""
            });
            toast.success("Item reported successfully!");
        }, 1000);
    };

    const handleContactClick = (item: any) => {
        setContactItem(item);
        setContactForm({
            message: item.type === 'Lost'
                ? `Hi, I think I found your ${item.title}. It matches the description.`
                : `Hi, I think this ${item.title} belongs to me. Can you confirm?`,
            contactInfo: ""
        });
        setIsContactDialogOpen(true);
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsContactSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsContactSubmitting(false);
            setIsContactDialogOpen(false);
            toast.success(`Message sent to the ${contactItem.type === 'Lost' ? 'owner' : 'finder'}!`);
            setContactForm({ message: "", contactInfo: "" });
            setContactItem(null);
        }, 1500);
    };

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
            <div className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
                {/* Enhanced Background */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />
                <div className="absolute top-0 left-1/4 -ml-20 -mt-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
                <div className="absolute bottom-0 right-1/4 -mr-20 -mb-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <ScrollReveal>
                            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md hover:bg-primary/15 transition-colors cursor-default">
                                <AlertCircle className="h-4 w-4 text-primary" />
                                <span className="text-xs font-bold uppercase tracking-widest text-primary">Community Support System</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.95] bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                                Lost something? <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">We've got you covered.</span>
                            </h1>

                            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                                Connect with the campus community to reunite with your lost belongings.
                                Trusted by thousands of students daily.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="lg" className="h-14 px-8 rounded-full text-base font-bold bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all duration-300 transform hover:-translate-y-1">
                                            <Plus className="h-5 w-5 mr-2" />
                                            Report Item
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
                                        <DialogHeader>
                                            <DialogTitle>Report an Item</DialogTitle>
                                            <DialogDescription>
                                                Fill in the details about the item you lost or found.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="type">I...</Label>
                                                <Select
                                                    value={newItem.type}
                                                    onValueChange={(val) => handleSelectChange("type", val)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Lost">Lost an item</SelectItem>
                                                        <SelectItem value="Found">Found an item</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="title">Item Name</Label>
                                                <Input
                                                    id="title"
                                                    name="title"
                                                    placeholder="e.g. Blue Airpods Max"
                                                    value={newItem.title}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="category">Category</Label>
                                                    <Select
                                                        value={newItem.category}
                                                        onValueChange={(val) => handleSelectChange("category", val)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Electronics">Electronics</SelectItem>
                                                            <SelectItem value="Accessories">Accessories</SelectItem>
                                                            <SelectItem value="Documents">Documents</SelectItem>
                                                            <SelectItem value="Books">Books</SelectItem>
                                                            <SelectItem value="Clothing">Clothing</SelectItem>
                                                            <SelectItem value="Other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="date">Date</Label>
                                                    <Input
                                                        id="date"
                                                        name="date"
                                                        type="date"
                                                        value={newItem.date}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="location">Location</Label>
                                                <Input
                                                    id="location"
                                                    name="location"
                                                    placeholder="e.g. Library, 2nd floor"
                                                    value={newItem.location}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    name="description"
                                                    placeholder="Provide more details to help identify the item..."
                                                    value={newItem.description}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label>Image</Label>
                                                <div className="flex items-center gap-4">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => document.getElementById('image-upload')?.click()}
                                                        className="w-full border-dashed"
                                                    >
                                                        {newItem.image ? "Change Image" : "Upload Image"}
                                                    </Button>
                                                    <input
                                                        id="image-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const imageUrl = URL.createObjectURL(file);
                                                                setNewItem(prev => ({ ...prev, image: imageUrl }));
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                {newItem.image && (
                                                    <div className="relative mt-2 w-full h-40 rounded-lg overflow-hidden border border-border">
                                                        <img
                                                            src={newItem.image}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full"
                                                            onClick={() => setNewItem(prev => ({ ...prev, image: "" }))}
                                                        >
                                                            ×
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>

                                            <DialogFooter>
                                                <Button type="submit" disabled={isSubmitting}>
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Submitting...
                                                        </>
                                                    ) : (
                                                        "Submit Report"
                                                    )}
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>

                                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base font-bold border-foreground/10 hover:bg-foreground/5 backdrop-blur-sm">
                                    Browse Recent
                                </Button>
                            </div>

                            {/* Stats Section */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full">
                                {[
                                    { label: "Active Cases", value: "142", sub: "+12 today" },
                                    { label: "Items Recovered", value: "85%", sub: "Success rate" },
                                    { label: "Community Users", value: "2.4k", sub: "Active now" },
                                    { label: "Avg. Return Time", value: "24h", sub: "Fast turnaround" },
                                ].map((stat, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-foreground/[0.03] border border-foreground/5 backdrop-blur-sm hover:bg-foreground/[0.05] transition-colors">
                                        <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
                                        <div className="text-sm font-semibold text-foreground/60">{stat.label}</div>
                                        <div className="text-xs text-primary font-medium mt-1">{stat.sub}</div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-12 pb-32 px-6 bg-gradient-to-b from-background to-foreground/[0.02]">
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
                                className="h-14 pl-12 rounded-full bg-white border-foreground/10 focus-visible:ring-primary/50 text-base shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item, index) => (
                            <ScrollReveal key={item.id} delay={index * 0.05} width="100%">
                                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                                    <Card className="bg-white border-foreground/5 dark:bg-foreground/[0.02] dark:border-foreground/10 overflow-hidden rounded-[2rem] hover:shadow-2xl transition-all duration-300 group h-full flex flex-col hover:border-primary/20">
                                        <div className="relative h-64 overflow-hidden">
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
                                            <Button
                                                variant="outline"
                                                className="w-full h-12 rounded-xl border-foreground/10 hover:bg-primary hover:text-white hover:border-primary font-bold tracking-wide transition-all"
                                                onClick={() => handleContactClick(item)}
                                            >
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

            {/* Contact Dialog */}
            <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Contact {contactItem?.type === 'Lost' ? 'Owner' : 'Finder'}</DialogTitle>
                        <DialogDescription>
                            Send a message regarding the <strong>{contactItem?.title}</strong>
                        </DialogDescription>
                    </DialogHeader>
                    {contactItem && (
                        <form onSubmit={handleContactSubmit} className="grid gap-4 py-4">
                            <div className="flex items-center gap-4 bg-muted/50 p-3 rounded-lg border border-border/50">
                                <div className="h-12 w-12 rounded-md overflow-hidden bg-background">
                                    <img src={contactItem.image} alt={contactItem.title} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{contactItem.title}</p>
                                    <p className="text-xs text-muted-foreground">{contactItem.location} • {contactItem.date}</p>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="contact-message">Message</Label>
                                <Textarea
                                    id="contact-message"
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                                    rows={4}
                                    required
                                    className="resize-none"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="contact-info">Your Contact Info (Email/Phone)</Label>
                                <Input
                                    id="contact-info"
                                    placeholder="e.g. 9876543210 or email@college.edu"
                                    value={contactForm.contactInfo}
                                    onChange={(e) => setContactForm(prev => ({ ...prev, contactInfo: e.target.value }))}
                                    required
                                />
                            </div>

                            <DialogFooter>
                                <Button type="submit" disabled={isContactSubmitting} className="w-full">
                                    {isContactSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
};
