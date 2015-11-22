

function list(listclasses) {

			col = listclasses[0].length;
			row = listclasses.length;

		
			console.log(col);
			console.log(row);
		  var table = [];
		
		  // First row is the header of the columns:
		  var header = [];
		  for (var c = 0; c <= col; c++) {
		    header[c] = objlist[0][c];
		  }
		
		  // Add the header:
		  table[0] = header;
		
		  // Now add each of the rows:
		  for (var r = 1; r <= row; r++) {
		    var nextrow = [];
		    for (var c = 1; c <= col; c++) {
		      nextrow[c] = objlist[r][c];
		    }
		
		    table[r] = nextrow;
		  }
		
		  // Display the table.
		  document.write('<table style="border: 1px solid green; border-collapse: collapse;">');
		  for (var r = 0; r < table.length; r++) {
		    var nextrow = table[r];
		    document.write('<tr style="padding: 10px;">');
		    for (var c = 0; c < nextrow.length; c++) {
		      document.write('<td style="border: 1px dotted red; padding: 10px">');
		      document.write(nextrow[c]);
		      document.write('</td>');
		    }
		    document.write('</tr>');
		  }
		  document.write('</table>');
}
