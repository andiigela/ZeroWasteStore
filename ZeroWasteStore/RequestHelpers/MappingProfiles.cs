using AutoMapper;
using MyStore.DTOs;
using MyStore.DTOs.Category;
using MyStore.Entities;

namespace MyStore.RequestHelpers
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
