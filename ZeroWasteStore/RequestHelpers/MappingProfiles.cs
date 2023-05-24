using AutoMapper;
using ZeroWasteStore.DTOs;
using ZeroWasteStore.DTOs.Category;
using ZeroWasteStore.Entities;

namespace ZeroWasteStore.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateProductDto, Product>();   
            CreateMap<UpdateProductDto, Product>();
            CreateMap<CreateShippingDto, Shipping>();
            CreateMap<UpdateShippingDto, Shipping>();
            CreateMap<CreateCategoryDto, Category>();
            CreateMap<UpdateCategoryDto, Category>();

        }
    }

 
}
