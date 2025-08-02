import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Drug {
  id: number;
  name: string;
  description: string;
  image: string;
  prescription: string;
  narcotic: string;
  sideEffects: string[];
  tags: string[];
  price: string;
}

const mockDrugs: Drug[] = [
  {
    id: 1,
    name: "CYBERPAIN-X",
    description: "Мощное обезболивающее нового поколения с нанотехнологиями",
    image: "/img/9112c8ff-5cc8-40a8-9278-17fbab3219d3.jpg",
    prescription: "Требуется рецепт врача",
    narcotic: "Не содержит наркотических веществ",
    sideEffects: ["Головокружение", "Сонливость", "Тошнота"],
    tags: ["обезболивающее", "рецептурное", "нанотех"],
    price: "₽2,500"
  },
  {
    id: 2,
    name: "NEURO-STIM",
    description: "Препарат для улучшения мозговой активности и концентрации",
    image: "/img/318d54b0-c6a9-44a8-99ac-cd408414aa7c.jpg",
    prescription: "Отпускается без рецепта",
    narcotic: "Содержит контролируемые вещества",
    sideEffects: ["Бессонница", "Повышенная активность", "Учащенное сердцебиение"],
    tags: ["ноотроп", "стимулятор", "концентрация"],
    price: "₽3,200"
  },
  {
    id: 3,
    name: "VIRUS-SHIELD",
    description: "Инновационная противовирусная терапия последнего поколения",
    image: "/img/9cd02c7b-e52b-487a-ba23-03844c70036f.jpg",
    prescription: "Требуется рецепт врача",
    narcotic: "Не содержит наркотических веществ",
    sideEffects: ["Слабость", "Повышение температуры", "Головная боль"],
    tags: ["противовирусное", "иммунитет", "рецептурное"],
    price: "₽4,100"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(new Set(mockDrugs.flatMap(drug => drug.tags)));

  const filteredDrugs = mockDrugs.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drug.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => drug.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gta-dark">
      {/* Header */}
      <header className="bg-black/50 border-b border-gta-cyan/30 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gta-yellow neon-text">
              PHARMA CORP
            </h1>
            <div className="flex items-center space-x-4">
              <Icon name="ShoppingCart" className="text-gta-cyan" size={24} />
              <Icon name="User" className="text-gta-cyan" size={24} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gta-cyan neon-text mb-4">
            FUTURE PHARMACY
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Медицина будущего уже здесь
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Input
              placeholder="Поиск лекарств..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="gta-search text-lg py-4 pl-12 text-white placeholder:text-gray-400"
            />
            <Icon 
              name="Search" 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gta-cyan" 
              size={20} 
            />
          </div>
        </div>
      </section>

      {/* Tags Filter */}
      <section className="px-6 mb-8">
        <div className="container mx-auto">
          <h3 className="text-xl font-bold text-gta-yellow mb-4">КАТЕГОРИИ:</h3>
          <div className="flex flex-wrap gap-3">
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-gta-cyan text-black neon-glow'
                    : 'border-gta-cyan/50 text-gta-cyan hover:bg-gta-cyan/20'
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Drugs Grid */}
      <section className="px-6 pb-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDrugs.map(drug => (
              <Card key={drug.id} className="gta-card hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={drug.image} 
                    alt={drug.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gta-yellow text-black font-bold">
                      {drug.price}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-gta-cyan neon-text text-xl">
                    {drug.name}
                  </CardTitle>
                  <p className="text-gray-300 text-sm">
                    {drug.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Prescription Info */}
                  <div className="flex items-center space-x-2">
                    <Icon name="FileText" className="text-gta-yellow" size={16} />
                    <span className="text-sm text-gray-300">
                      {drug.prescription}
                    </span>
                  </div>

                  {/* Narcotic Info */}
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" className="text-gta-pink" size={16} />
                    <span className="text-sm text-gray-300">
                      {drug.narcotic}
                    </span>
                  </div>

                  {/* Side Effects */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="AlertTriangle" className="text-orange-400" size={16} />
                      <span className="text-sm font-medium text-gray-300">
                        Побочные эффекты:
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      {drug.sideEffects.map((effect, index) => (
                        <div key={index}>• {effect}</div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {drug.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs border-gta-cyan/30 text-gta-cyan"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full gta-button text-black hover:text-black">
                    ЗАКАЗАТЬ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDrugs.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Search" className="text-gray-500 mx-auto mb-4" size={48} />
              <p className="text-xl text-gray-400">
                Препараты не найдены
              </p>
              <p className="text-gray-500">
                Попробуйте изменить поисковый запрос или фильтры
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-gta-cyan/30 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gta-cyan">
            © 2024 PHARMA CORP - Лекарства будущего
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <Icon name="Phone" className="text-gta-yellow" size={20} />
            <Icon name="Mail" className="text-gta-yellow" size={20} />
            <Icon name="MapPin" className="text-gta-yellow" size={20} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;