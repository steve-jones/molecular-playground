<%@ Page MasterPageFile="Site.master" Language="C#" Inherits="csharp_test.Default" %>

<asp:Content ContentPlaceHolderId="CPH1" runat="server">
	<form id="form1" runat="server">
		<asp:Button id="button1" runat="server" Text="Click me!" OnClick="button1Clicked" /> <br />
		<asp:Label id="label1" runat="server"  />
	</form>
</asp:Content>
