using Perflow.Domain;
using System;
using System.Collections.Generic;

namespace Perflow.Common.DTO.Users
{
    public class UserReadDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string IconURL { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public DateTimeOffset Birthday { get; set; }
        public bool Gender { get; set; }
    }
}
