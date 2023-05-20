using Microsoft.EntityFrameworkCore;
using ZeroWasteStore.Entities;

namespace ZeroWasteStore.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
    }
}
