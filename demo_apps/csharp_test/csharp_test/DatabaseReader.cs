using System;
using System.Data.Common;
using Npgsql;

namespace csharp_test
{
	public class DatabaseReader
	{
		public static string ExecuteQuery(string queryString)
		{
			string str = "";
			using (var conn = new NpgsqlConnection("Host=localhost;Username=jim;Password=test2;Database=test"))
			{
				conn.Open();
				using (var cmd = new NpgsqlCommand())
				{
					cmd.Connection = conn;

					cmd.CommandText = queryString;
					using (var reader = cmd.ExecuteReader())
					{
						while (reader.Read())
						{
							str += reader.GetString(0);
						}
					}
				}
			}

			return str;
		}
	}
}

