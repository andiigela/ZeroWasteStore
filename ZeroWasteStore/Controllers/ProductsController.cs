using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZeroWasteStore.Controllers;
using ZeroWasteStore.Data;
using ZeroWasteStore.DTOs;
using ZeroWasteStore.Entities;
using ZeroWasteStore.Extensions;
using ZeroWasteStore.RequestHelpers;

namespace MyStore.Controllers
{
   
    public class ProductsController : BaseApiController
    {

        private readonly StoreContext context;
        private readonly IMapper mapper;

        public ProductsController(StoreContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query = context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands,productParams.Types)
                .AsQueryable();

            var products =
                await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
            
            Response.AddPaginationHeader (products.MetaData) ;
            
            return products;
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

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }


    }
}
