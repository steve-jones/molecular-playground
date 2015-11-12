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
			label1.Text = DatabaseReader.ExecuteQuery("SELECT NAME FROM Table1");
			button1.Text = "Button clicked";
		}
	}
}
