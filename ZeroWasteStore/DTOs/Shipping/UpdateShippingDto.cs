using System.ComponentModel.DataAnnotations;

namespace MyStore.DTOs;

public class UpdateShippingDto
{
    public int Id { get; set; }
    [Required] public Double Weight { get; set; }
    [Required] public String Pickuplocation { get; set; }
    [Required] public String Description { get; set; }
    [Required] public int trackingNumber { get; set; }

}