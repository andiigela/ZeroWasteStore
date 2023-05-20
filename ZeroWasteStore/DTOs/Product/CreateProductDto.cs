using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace MyStore.DTOs
{
    public class CreateProductDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [Range(100,Double.PositiveInfinity)]
        public long Price { get; set; }
       // public IFormFile PictureUrl { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        [Range(0,200)]
        public int QuantityStock { get; set; }
    }
}
