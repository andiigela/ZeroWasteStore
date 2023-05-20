using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyStore.Entities;

public class Shipping
{
    public int Id { get; set; }
    public Double Weight { get; set; }
    public String Pickuplocation { get; set; }
    public String Description { get; set; }
    public int trackingNumber { get; set; }
    
}