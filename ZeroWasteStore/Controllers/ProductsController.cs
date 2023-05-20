using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyStore.Data;
using MyStore.DTOs;
using MyStore.Entities;

namespace MyStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {

        private readonly StoreContext context;
        private readonly IMapper mapper;

        public ProductsController(StoreContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("")]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await context.Products.ToListAsync();
        }

        [HttpGet("{id}",Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await context.Products.FindAsync(id);
        }
        
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(CreateProductDto productDto)
        {
            var product = mapper.Map<Product>(productDto);
            context.Products.Add(product);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetProduct", new { Id = product.Id},product);
            return BadRequest(new ProblemDetails { Title = "Problem creating new product"});
        }
        [HttpPut]
        public async Task<ActionResult> UpdateProduct(UpdateProductDto productDto)
        {
            var product = await context.Products.FindAsync(productDto.Id);
            if(product == null) return NotFound();
            mapper.Map(productDto,product);
            var result = await context.SaveChangesAsync() > 0;
            if (result)
            {
                return NoContent();
            }else
            {
                return BadRequest(new ProblemDetails { Title = "Problem Updating Products" });
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await context.Products.FindAsync(id);
            if(product == null) return NotFound();
            context.Products.Remove(product);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
        }


    }
}
