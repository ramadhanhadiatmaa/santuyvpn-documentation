function run() {
    document.getElementById("seltype").value = document.getElementById("selecttype").value;
  }
  
function runo() {
    document.getElementById("selcountry").value = document.getElementById("selectcountry").value;
}
  
function runt() {
    document.getElementById("selsignal").value = document.getElementById("selectsignal").value;
}

document.getElementById('submit').onclick = function() {

    var fileUrl;

    var files = document.getElementById("ovpn").files[0];
  
    var country = document.getElementById("country").value;
    var subtitle = document.getElementById("subtitle").value;
    var ovpnUserName = document.getElementById("ovpnUserName").value;
    var ovpnUserPassword = document.getElementById("ovpnUserPassword").value;
    var select_country = document.getElementById("selcountry").value;
    var select_signal = document.getElementById("selsignal").value;
    var type = document.getElementById("seltype").value;
  
  
    var uploadTask = firebase.storage().ref('Servers/'+subtitle).put(files);
  
    uploadTask.on('state_changed', function(snapshot){
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      console.log('Upload is ' + progress + '% done');
      document.getElementById('UpProgress').innerHTML = 'Upload '+progress+'%';
    },
  
    function(error){
      alert('error in saving file')
    },
  
    function(){
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        fileUrl = downloadURL;
  
        var postsRef = firebase.database().ref('Server');
        var newPostRef = postsRef.push();
        var postId = newPostRef.key;
  
        postsRef.child(type).child(postId).set({
          country: country,
          sub: subtitle,
          ovpn: fileUrl,
          flagUrl: select_country,
          ovpnUserName: ovpnUserName,
          ovpnUserPassword: ovpnUserPassword,
          sort: select_signal,
          serverid: postId,
          check: firebase.database.ServerValue.TIMESTAMP
        });
          alert('file added successfully')
        });
    });
}