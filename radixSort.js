
function bucketToArray(bucket, array){

	//for each digit, push each item in that array back into array
	bucket.forEach(function(pail){

		//set a var for pail.length because shifting changes length
		var pailLength = pail.length;

		for(var i=0;i<pailLength;i++){		
			//take the first item of each pail and insert into array
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
	//find largest number to determine K iteration
	for(var j = 0; j < array.length; j++){	
		if(largest < array[j]){
			largest = array[j];
		}
	}
	var largestLength = largest.toString().length;
	
	//sort this in O(kn) time. K = largest significant digits while N = total length of array
	for(var k = 0; k < largestLength; k++){
		for(var n = 0; n < nLength; n++){
			
			//find least significant integer to determine what bucket to place in 	
			var temp = array[0].toString();	
			temp = temp[temp.length-1-k];
			
			//if no leading zeros temp = undefined, push into 0 bucket
			if(!temp){
				//Changed splice into shift as shift is considerably faster than splice(0,1)[0]
				var zero = array.shift();
				bucket[0].push(zero);
				
			}else{
				//take the item out of the array and push into proper bucket
				//convert temp into number with parseInt to have correct index
				var insert = array.shift();
				bucket[parseInt(temp)].push(insert);		
			}	
		}	
		//take everything from bucket and push back into array
		bucketToArray(bucket,array);	
	}
	return array;
}

//Test random array//
var testArray= [];
var arraySize = 10;

for(var i = 0; i < arraySize; i++){
	testArray.push(Math.floor((Math.random() * 20000) + 1));
}

//log unsorted array
console.log(testArray);
//log sorted array
console.log(radixSort(testArray));
console.log(typeof radixSort(testArray)[0]);