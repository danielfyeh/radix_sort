
function bucketToArray(bucket, array){

	bucket.forEach(function(pail){
		var pailLength = pail.length;

		for(var i=0;i<pailLength;i++){			
			var insert = pail.shift();
			array.push(insert);
		}		
	});
}

function radixSort(array){
	//in case array is empty just return;
	if(array.length < 1){
		return;
	}
	//Least Signficant digit LSD
	//create buckets for digits 0-9
	var bucket = [];
	var radix = 10;
	var largest = 0;
	var nLength = array.length;
	//initialize bucket push a bucket for each digit
	for(var i =0; i < radix; i++){
		bucket.push([]);
	}
	//find largest number 
	for(var j = 0; j < array.length; j++){	
		if(largest < array[j]){
			largest = array[j];
		}
	}
	var largestLength = largest.toString().length;
	
	//sort this O(kn) time. K = largest value while N = total length of array
	for(var k = 0; k < largestLength; k++){
		for(var n = 0; n < nLength; n++){
			//find least significant integer
			
			var temp = array[0].toString();	
			temp = temp[temp.length-1-k];
			
			//if no leading zeros push into 0 bucket
			if(!temp){
				var lead = array.splice(0,1);
				bucket[0].push(lead[0]);
				
			}else{
				//take the item out of the array and push into proper bucket
				var insert = array.splice(0,1);
				bucket[parseInt(temp)].push(insert[0]);		
			}	
		}	
		//take everything from bucket and push back into array
		bucketToArray(bucket,array);	
	}
	return array;
}


var testArray= [];
var arraySize = 10;

for(var i = 0; i < arraySize; i++){
	testArray.push(Math.floor((Math.random() * 20000) + 1));
}

console.log(testArray);

console.log(radixSort(testArray));