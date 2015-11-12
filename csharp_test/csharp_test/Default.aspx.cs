using System;
using System.Data.Common;
using System.Web;
using System.Web.UI;
using Npgsql;

namespace csharp_test
{
	public partial class Default : System.Web.UI.Page
	{
		public void button1Clicked(object sender, EventArgs args)
		{
			string str = "";
			button1.Text = "You clicked me";

			using (var conn = new NpgsqlConnection("Host=localhost;Username=jim;Password=test2;Database=test"))
			{
				conn.Open();
				using (var cmd = new NpgsqlCommand())
				{
					cmd.Connection = conn;

					cmd.CommandText = "SELECT NAME FROM Table1";
					using (var reader = cmd.ExecuteReader())
					{
						while (reader.Read())
						{
							str += reader.GetString(0);
						}
					}
				}

				label1.Text = str;
			}
		}
	}
}
