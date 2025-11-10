const TopCategories = () => {
  const categories = [
    {
      name: "Web Development",
      img: "https://cdn-icons-png.flaticon.com/512/919/919851.png"
    },
    {
      name: "Graphics Design",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
      name: "Digital Marketing",
      img: "https://cdn-icons-png.flaticon.com/512/4149/4149700.png"
    },
    {
      name: "Content Writing",
      img: "https://cdn-icons-png.flaticon.com/512/2811/2811797.png"
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Top Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div key={index} className="bg-white p-6 shadow rounded-lg hover:scale-105 duration-300 text-center">
            <img className="h-20 mx-auto" src={cat.img} alt={cat.name} />
            <h3 className="text-lg font-semibold mt-3">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
