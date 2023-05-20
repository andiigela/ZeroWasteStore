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
    public class ShippingController : ControllerBase
    {
        private readonly StoreContext context;
        private readonly IMapper mapper;

        public ShippingController(StoreContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet("")]
        public async Task<ActionResult<List<Shipping>>> GetShippings()
        {
            return await context.Shippings.ToListAsync();
        }
        [HttpGet("{id}",Name = "GetShipping")]
        public async Task<ActionResult<Shipping>> GetShipping(int id)
        {
            return await context.Shippings.FindAsync(id);
        }
        [HttpPost]
        public async Task<ActionResult<Shipping>> CreateShipping(CreateShippingDto shippingDto)
        {
            var shipping = mapper.Map<Shipping>(shippingDto);
            context.Shippings.Add(shipping);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetShipping", new { Id = shipping.Id},shipping);
            return BadRequest(new ProblemDetails { Title = "Problem creating new shipping"});
        }
        [HttpPut]
        public async Task<ActionResult> UpdateShipping(UpdateShippingDto shippingDto)
        {
            var shipping = await context.Shippings.FindAsync(shippingDto.Id);
            if(shipping == null) return NotFound();
            mapper.Map(shippingDto,shipping);
            var result = await context.SaveChangesAsync() > 0;
            if (result)
            {
                return NoContent();
            }else
            {
                return BadRequest(new ProblemDetails { Title = "Problem Updating Shippings" });
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteShipping(int id)
        {
            var shipping = await context.Shippings.FindAsync(id);
            if(shipping == null) return NotFound();
            context.Shippings.Remove(shipping);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem deleting shipping" });
        }
    }
        
        
    
}