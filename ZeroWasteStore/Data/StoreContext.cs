using Microsoft.EntityFrameworkCore;
using MyStore.Entities;

namespace MyStore.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Shipping> Shippings  { get; set; }
        public DbSet<Category> Categories  { get; set; }

    }
}