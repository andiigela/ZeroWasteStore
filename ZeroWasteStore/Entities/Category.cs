using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace ZeroWasteStore.Entities;

public class Category
{
    public int Id { get; set; }
    
    public String Name { get; set; }
    
    public String Description { get; set; }
    
    public List<Product> ListOfProducts { get; set; }
    
}