using AutoMapper;
using ZeroWasteStore.DTOs.Product;
using ZeroWasteStore.Entities;

namespace ZeroWasteStore.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();
        }
    }
}
