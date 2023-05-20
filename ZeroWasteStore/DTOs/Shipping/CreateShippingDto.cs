using System.ComponentModel.DataAnnotations;

namespace MyStore.DTOs;

public class CreateShippingDto
{
  [Required] public Double Weight { get; set; }
  [Required] public String Pickuplocation { get; set; }
  [Required] public String Description { get; set; }
  [Required] public int trackingNumber { get; set; }

}