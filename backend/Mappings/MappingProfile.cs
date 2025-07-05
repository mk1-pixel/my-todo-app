using AutoMapper;
using backend.Models;
using backend.Dtos;
namespace backend.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile() { 
            CreateMap<TodoItem, TodoDto>()
                .ForMember(dest => dest.Tags, 
                opt => opt.MapFrom(src => src.TodoTags.Select(tt => tt.Tags.Name).ToList()));
            }
    }
}
