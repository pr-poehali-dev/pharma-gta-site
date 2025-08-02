import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
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
  category: string;
}

interface DrugFormData {
  name: string;
  description: string;
  image: string;
  prescription: string;
  narcotic: string;
  sideEffects: string;
  tags: string;
  price: string;
  category: string;
}

const defaultDrugs: Drug[] = [
  {
    id: 1,
    name: "CYBERPAIN-X",
    description: "Мощное обезболивающее нового поколения с нанотехнологиями",
    image: "/img/9112c8ff-5cc8-40a8-9278-17fbab3219d3.jpg",
    prescription: "Требуется рецепт врача",
    narcotic: "Не содержит наркотических веществ",
    sideEffects: ["Головокружение", "Сонливость", "Тошнота"],
    tags: ["обезболивающее", "рецептурное", "нанотех"],
    price: "₽2,500",
    category: "Обезболивающие"
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
    price: "₽3,200",
    category: "Ноотропы"
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
    price: "₽4,100",
    category: "Противовирусные"
  }
];

const defaultCategories = ["Обезболивающие", "Ноотропы", "Противовирусные", "Антибиотики", "Витамины"];

const availableImages = [
  "/img/9112c8ff-5cc8-40a8-9278-17fbab3219d3.jpg",
  "/img/318d54b0-c6a9-44a8-99ac-cd408414aa7c.jpg",
  "/img/9cd02c7b-e52b-487a-ba23-03844c70036f.jpg"
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [drugs, setDrugs] = useState<Drug[]>(defaultDrugs);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [editingDrug, setEditingDrug] = useState<Drug | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  
  const [formData, setFormData] = useState<DrugFormData>({
    name: "",
    description: "",
    image: availableImages[0],
    prescription: "Требуется рецепт врача",
    narcotic: "Не содержит наркотических веществ",
    sideEffects: "",
    tags: "",
    price: "",
    category: ""
  });

  const allTags = Array.from(new Set(drugs.flatMap(drug => drug.tags)));

  const filteredDrugs = drugs.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drug.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => drug.tags.includes(tag));
    const matchesCategory = selectedCategory === "" || drug.category === selectedCategory;
    return matchesSearch && matchesTags && matchesCategory;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image: availableImages[0],
      prescription: "Требуется рецепт врача",
      narcotic: "Не содержит наркотических веществ",
      sideEffects: "",
      tags: "",
      price: "",
      category: ""
    });
  };

  const handleAddDrug = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      alert("Заполните все обязательные поля!");
      return;
    }

    const newDrug: Drug = {
      id: Math.max(...drugs.map(d => d.id), 0) + 1,
      name: formData.name,
      description: formData.description,
      image: formData.image,
      prescription: formData.prescription,
      narcotic: formData.narcotic,
      sideEffects: formData.sideEffects.split(',').map(s => s.trim()).filter(s => s),
      tags: formData.tags.split(',').map(s => s.trim()).filter(s => s),
      price: formData.price,
      category: formData.category
    };

    setDrugs([...drugs, newDrug]);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditDrug = () => {
    if (!editingDrug || !formData.name || !formData.description || !formData.price || !formData.category) {
      alert("Заполните все обязательные поля!");
      return;
    }

    const updatedDrug: Drug = {
      ...editingDrug,
      name: formData.name,
      description: formData.description,
      image: formData.image,
      prescription: formData.prescription,
      narcotic: formData.narcotic,
      sideEffects: formData.sideEffects.split(',').map(s => s.trim()).filter(s => s),
      tags: formData.tags.split(',').map(s => s.trim()).filter(s => s),
      price: formData.price,
      category: formData.category
    };

    setDrugs(drugs.map(drug => drug.id === editingDrug.id ? updatedDrug : drug));
    resetForm();
    setEditingDrug(null);
    setIsEditDialogOpen(false);
  };

  const openEditDialog = (drug: Drug) => {
    setEditingDrug(drug);
    setFormData({
      name: drug.name,
      description: drug.description,
      image: drug.image,
      prescription: drug.prescription,
      narcotic: drug.narcotic,
      sideEffects: drug.sideEffects.join(', '),
      tags: drug.tags.join(', '),
      price: drug.price,
      category: drug.category
    });
    setIsEditDialogOpen(true);
  };

  const deleteDrug = (id: number) => {
    if (confirm("Удалить этот препарат?")) {
      setDrugs(drugs.filter(drug => drug.id !== id));
    }
  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const DrugForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-gta-cyan">Название препарата *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="gta-search mt-1"
          placeholder="Введите название..."
        />
      </div>

      <div>
        <Label htmlFor="description" className="text-gta-cyan">Описание *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="gta-search mt-1"
          placeholder="Описание препарата..."
        />
      </div>

      <div>
        <Label htmlFor="category" className="text-gta-cyan">Категория *</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
          <SelectTrigger className="gta-search mt-1">
            <SelectValue placeholder="Выберите категорию" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="image" className="text-gta-cyan">Изображение</Label>
        <Select value={formData.image} onValueChange={(value) => setFormData({...formData, image: value})}>
          <SelectTrigger className="gta-search mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableImages.map((img, index) => (
              <SelectItem key={img} value={img}>Изображение {index + 1}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="price" className="text-gta-cyan">Цена *</Label>
        <Input
          id="price"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          className="gta-search mt-1"
          placeholder="₽1,000"
        />
      </div>

      <div>
        <Label htmlFor="prescription" className="text-gta-cyan">Рецептурный статус</Label>
        <Select value={formData.prescription} onValueChange={(value) => setFormData({...formData, prescription: value})}>
          <SelectTrigger className="gta-search mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Требуется рецепт врача">Требуется рецепт врача</SelectItem>
            <SelectItem value="Отпускается без рецепта">Отпускается без рецепта</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="narcotic" className="text-gta-cyan">Наркотическое содержание</Label>
        <Select value={formData.narcotic} onValueChange={(value) => setFormData({...formData, narcotic: value})}>
          <SelectTrigger className="gta-search mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Не содержит наркотических веществ">Не содержит наркотических веществ</SelectItem>
            <SelectItem value="Содержит контролируемые вещества">Содержит контролируемые вещества</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="sideEffects" className="text-gta-cyan">Побочные эффекты</Label>
        <Input
          id="sideEffects"
          value={formData.sideEffects}
          onChange={(e) => setFormData({...formData, sideEffects: e.target.value})}
          className="gta-search mt-1"
          placeholder="Головокружение, Тошнота, Слабость"
        />
        <p className="text-xs text-gray-400 mt-1">Разделяйте запятыми</p>
      </div>

      <div>
        <Label htmlFor="tags" className="text-gta-cyan">Теги</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({...formData, tags: e.target.value})}
          className="gta-search mt-1"
          placeholder="обезболивающее, рецептурное"
        />
        <p className="text-xs text-gray-400 mt-1">Разделяйте запятыми</p>
      </div>

      <Button 
        onClick={isEdit ? handleEditDrug : handleAddDrug}
        className="w-full gta-button text-black hover:text-black"
      >
        {isEdit ? "СОХРАНИТЬ ИЗМЕНЕНИЯ" : "ДОБАВИТЬ ПРЕПАРАТ"}
      </Button>
    </div>
  );

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
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gta-button text-black hover:text-black">
                    <Icon name="Plus" size={16} className="mr-2" />
                    ДОБАВИТЬ ПРЕПАРАТ
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gta-dark border-gta-cyan/30 max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-gta-cyan neon-text">НОВЫЙ ПРЕПАРАТ</DialogTitle>
                  </DialogHeader>
                  <DrugForm />
                </DialogContent>
              </Dialog>
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

      {/* Filters */}
      <section className="px-6 mb-8">
        <div className="container mx-auto space-y-6">
          {/* Categories */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-xl font-bold text-gta-yellow">КАТЕГОРИИ:</h3>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Новая категория"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="gta-search w-48"
                />
                <Button onClick={addCategory} className="gta-button text-black hover:text-black px-3">
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge
                variant={selectedCategory === "" ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === ""
                    ? 'bg-gta-yellow text-black neon-glow'
                    : 'border-gta-yellow/50 text-gta-yellow hover:bg-gta-yellow/20'
                }`}
                onClick={() => setSelectedCategory("")}
              >
                ВСЕ
              </Badge>
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gta-yellow text-black neon-glow'
                      : 'border-gta-yellow/50 text-gta-yellow hover:bg-gta-yellow/20'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-xl font-bold text-gta-pink mb-4">ТЕГИ:</h3>
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
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => openEditDialog(drug)}
                      className="bg-gta-cyan/80 text-black hover:bg-gta-cyan p-2"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => deleteDrug(drug.id)}
                      className="bg-red-500/80 text-white hover:bg-red-500 p-2"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gta-cyan neon-text text-xl">
                      {drug.name}
                    </CardTitle>
                    <Badge variant="outline" className="border-gta-pink/50 text-gta-pink text-xs">
                      {drug.category}
                    </Badge>
                  </div>
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
                  {drug.sideEffects.length > 0 && (
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
                  )}

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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gta-dark border-gta-cyan/30 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-gta-cyan neon-text">РЕДАКТИРОВАТЬ ПРЕПАРАТ</DialogTitle>
          </DialogHeader>
          <DrugForm isEdit={true} />
        </DialogContent>
      </Dialog>

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