using MyStore.Entities;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace MyStore.DTOs.Category;

public class CreateCategoryDto
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