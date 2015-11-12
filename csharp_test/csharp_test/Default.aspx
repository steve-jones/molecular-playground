<%@ Page MasterPageFile="Site.master" Language="C#" Inherits="csharp_test.Default" %>

<asp:Content ContentPlaceHolderId="CPH1" runat="server">
	<form id="form1" runat="server">
		<asp:Label id="instructions" runat="server" Text="Enter a sql statement in the box below:" /> <br /><br />
		<asp:TextBox id="textBox1" runat="server" Text="SELECT NAME FROM Table1" Width="300px" />
		<asp:Button id="button1" runat="server" Text="Execute" OnClick="button1Clicked" /> <br />
		<asp:Label id="label1" runat="server"  />
	</form>
</asp:Content>
