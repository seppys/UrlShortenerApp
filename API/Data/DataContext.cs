﻿using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
	public class DataContext : IdentityDbContext<User>
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options) { }

		public DbSet<Url> Urls { get; set; }
	}
}
