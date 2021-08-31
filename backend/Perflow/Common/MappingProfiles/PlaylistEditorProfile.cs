using AutoMapper;
using Perflow.Common.DTO.PlaylistEditors;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.MappingProfiles
{
    public class PlaylistEditorProfile : Profile
    {
        public PlaylistEditorProfile()
        {
            CreateMap<PlaylistEditor, PlaylistEditorDTO>();

            CreateMap<PlaylistEditorDTO, PlaylistEditor>();
        }
    }
}
