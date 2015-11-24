<%@ WebHandler Language="C#" Class="csharp_test.action" %>
using System;
using System.Web;

namespace csharp_test
{

	public class action : System.Web.IHttpHandler
	{
	
		public void ProcessRequest (HttpContext context)
		{
		System.Diagnostics.Debug.WriteLine("hey testing");
			Console.WriteLine ("Hello Mono World");
		}
	
		public bool IsReusable {
			get {
				return false;
			}
		}
	}
}
