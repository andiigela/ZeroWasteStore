using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZeroWasteStore.Controllers;
using ZeroWasteStore.Data;
using ZeroWasteStore.DTOs.Category;
using ZeroWasteStore.Entities;

namespace MyStore.Controllers
{
        public class CategoriesController : BaseApiController
        {

            private readonly StoreContext context;
            private readonly IMapper mapper;

            public CategoriesController(StoreContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            [HttpGet("")]
            public async Task<ActionResult<List<Category>>> GetCategories()
            {
                return await context.Categories.ToListAsync();
            }

            [HttpGet("{id}", Name = "GetCategory")]
            public async Task<ActionResult<Category>> GetCategory(int id)
            {
                return await context.Categories.FindAsync(id);
            }

            [HttpPost]
            public async Task<ActionResult<Category>> CreateCategory(CreateCategoryDto categoryDto)
            
            
            {
                var category = mapper.Map<Category>(categoryDto);
                context.Categories.Add(category);
                var result = await context.SaveChangesAsync() > 0;
                if (result) return CreatedAtRoute("GetCategory", new { Id = category.Id }, category);
                return BadRequest(new ProblemDetails { Title = "Problem creating new category" });
            }

            [HttpPut]
            public async Task<ActionResult> UpdateCategory(UpdateCategoryDto categoryDto)
            {
                var category = await context.Categories.FindAsync(categoryDto.Id);
                if (category == null) return NotFound();
                mapper.Map(categoryDto, category);
                var result = await context.SaveChangesAsync() > 0;
                if (result)
                {
                    return NoContent();
                }
                else
                {
                    return BadRequest(new ProblemDetails { Title = "Problem Updating Category" });
                }
            }

            [HttpDelete("{id}")]
            public async Task<ActionResult> DeleteCategory(int id)
            {
                var category = await context.Categories.FindAsync(id);
                if (category == null) return NotFound();
                context.Categories.Remove(category);
                var result = await context.SaveChangesAsync() > 0;
                if (result) return Ok();
                return BadRequest(new ProblemDetails { Title = "Problem deleting category" });
            }
        }
    }
