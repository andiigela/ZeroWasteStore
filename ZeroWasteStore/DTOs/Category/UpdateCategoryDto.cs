using System.ComponentModel.DataAnnotations;
using ZeroWasteStore.Entities;


namespace ZeroWasteStore.DTOs.Category;

public class UpdateCategoryDto
{
    [Required]
    public int Id { get; set; }
    [Required]
    public String Name { get; set; }
    [Required]
    public String Description { get; set; }
    [Required]
    public List<Product> ListOfProducts { get; set; }
}