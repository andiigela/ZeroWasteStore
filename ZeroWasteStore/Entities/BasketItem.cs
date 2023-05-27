using System.ComponentModel.DataAnnotations.Schema;

namespace ZeroWasteStore.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        // navigation properties for Relationship with Product One - One
        public int ProductId { get; set; }
        public Product Product { get; set; }

        // navigation properties for Relationship Cascade One - Many with Basket
        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}