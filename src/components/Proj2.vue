<template>
  <div v-if="show" class="modal-mask" transition="modal">
    <div style="
        width: 450px;
        text-align: center;
        margin: calc(20vh) auto auto auto;" class="panel panel-primary">
      <div class="panel-heading">
        <div class="col-3">
        <font-awesome-icon icon="fa-solid fa-plus"/> Add Task
        </div>
        </div>
      <div class="panel-body">
        <form style="width: 420px; margin: 0 auto auto auto;" class="row"> 
          <div class="row">
            <label for="title" class="form-label">Title</label>
            <input  type="text" id="title" placeholder="Title" v-model="Title" required>
            <small style="color:red;">{{ titleInfo }}</small>
          </div>
            </br>
          <div class="row">
            <label for="description1">Description</label>
            <input type="text" id="description1" style="display:block;" placeholder="description" v-model="Description" required>
            <small style="color:red;">{{ descriptInfo }}</small>
          </div>
            </br>
          <div class="row">
            <label for="deadline">Deadline</label>
            <input type="date" id="deadline" style="display:block;" id="date-in" v-model="Deadline"/>
          </div>
            </br>
          <div class="form-group">
            <p>Priority:</p>
              <div class="row">
              <div class="col-4">
                <input type="radio" id="Low" v-model="Priority "value="Low" >
                <label for="Low">Low</label>
              </div>
              <div class="col-4">
                <input type="radio" id="Medium" v-model="Priority" value="Medium">
                <label for="Medium">Medium</label>
              </div>
              <div class="col-4">
                <input type="radio" id="High" v-model="Priority" value="High">
                <label for="High">High</label>
              </div>
            </div>
          </form>
        <div>
        <button class="submitties" @click="onSubmit"><font-awesome-icon icon="fa-solid fa-plus" style="color:white;"/>Add</button>
        <button class="cancelers" @click="closeDialog()"><font-awesome-icon icon="fa-solid fa-ban" style="color:white;"/>Cancel</button>
        </div>
      </div>
    </div>
  </div>
  </div>

 <div v-if="show2" class="modal-mask" transition="modal">
    <div style="
        width: 450px;
        text-align: center;
        margin: calc(20vh) auto auto auto;" class="panel panel-primary">
      <div class="panel-heading">
        <div class="col-3">
        <font-awesome-icon icon="fa-regular fa-pen-to-square"/> Edit Task
        </div>
        </div>
      <div class="panel-body">
        <form style="width: 420px; margin: 0 auto auto auto;" class="row"> 
          <div class="row">
            <label for="description2">Description</label>
            <input type="text" id="description2" style="display:block;" placeholder="description" v-model="Description" required>
            <small style="color:red;">{{ descriptInfo }}
            </small>
          </div>
            </br>
          <div class="row">
            <label for="deadline">Deadline</label>
            <input type="date" id="deadline" style="display:block;" id="date-in" v-model="Deadline"/>
          </div>
            </br>
          <div class="form-group">
            <p>Priority:</p>
              <div class="row">
              <div class="col-4">
                <input type="radio" id="Low" v-model="Priority "value="Low" >
                <label for="Low">Low</label>
              </div>
              <div class="col-4">
                <input type="radio" id="Medium" v-model="Priority" value="Medium">
                <label for="Medium">Medium</label>
              </div>
              <div class="col-4">
                <input type="radio" id="High" v-model="Priority" value="High">
                <label for="High">High</label>
              </div>
            </div>
          </form>
        <div>
        <button class="submitties" @click="updateEntry()"><font-awesome-icon icon="fa-regular fa-pen-to-square" style="color:white;"/>Edit</button>
        <button class="cancelers" @click="closeDialog2()"><font-awesome-icon icon="fa-solid fa-ban" style="color:white;"/>Cancel</button>
        </div>
      </div>
    </div>
  </div>
  </div>

  <div>
    <div class="panel panel-primary">
      <div class="panel-heading">
      <div class="row">
      <div class="col-9">
        <font-awesome-icon icon="fa-solid fa-list"/>Frameworks
        </div>
      <div class="col-3">
      <div class="row">
      <button id="add" @click="openDialog" type="button"><font-awesome-icon icon="fa-solid fa-plus"/>Add</button>
      </div>
      </div>
      </div>
      </div>
      <div class="panel-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Deadline</th>
              <th scope="col">Priority</th>
              <th scope="col">Is Complete</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry) in list">
              <th scope="col">{{ entry.Title }}</th>
              <th scope="col">{{ entry.Description }}</th>
              <th scope="col">{{ entry.Deadline }}</th>
              <th scope="col">{{ entry.Priority }}</th>
              <th scope="col"><input type="checkbox" v-model="entry.update"></th>
              <th scope="col">
              <button v-if="!entry.update" style="background-color:#3785de" @click="openDialog2(entry)" ><font-awesome-icon icon="fa-regular fa-pen-to-square"/>Update
              </button>
              <button style="background-color:red" @click="delet(entry)"> <font-awesome-icon icon="fa-solid fa-ban"/>Delete
              </button></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import $ from 'jquery';
export default {
  name: 'Proj2',
  data: () => ({
    Title: "", 
    Description: "", 
    Deadline: "",
    Priority: "", 
    entries: [],
    titles: [],
    show: false,
    show2: false,
    update: true,
    updateIndex: 0,
    titleInfo: "",
    descriptInfo: "",
    }),
  methods:{
    openDialog() {
      this.show = true;
    },
    closeDialog() {
      this.show = false;
      this.clear();
    },
    openDialog2(input){
      this.updateIndex = this.entries.indexOf(input);
      this.show2 = true;
    },
    closeDialog2() {
      this.show2 = false;
      this.clear();
    },
  onSubmit() {
      let i = 0;
      if(this.Title == ""){
         $("#title").addClass("error");
         this.titleInfo = "Please enter a valid title";
         i += 1;
       }
      if(this.Title != ""){
        $("#title").removeClass("error");
        this.titleInfo = "";
      }
      if(this.titles.includes(this.Title) == true){
        $("#title").addClass("error");
        this.titleInfo = "This title has already been taken";
        i += 1;
      }
      if(this.Description == ""){
        $("#description1").addClass("error");
        this.descriptInfo = "Please enter a valid description";
        i += 1;
      }
      if(this.Description != ""){
        $("#description1").removeClass("error");
        this.descriptInfo = "";
      }
      if(i == 0){
        this.entries.push({ Title: this.Title, Description: this.Description, Deadline: this.Deadline, Priority: this.Priority });
        this.titles.push(this.Title);
        toastr.success("task added successfully");
        this.closeDialog();
        this.clear();
      }
    },
  clear() {
    this.Title = "";
    this.Description = "";
    this.Deadline = "";
    this.Priority = "";
  },
  delet(input){
    let index = this.entries.indexOf(input);
    this.entries.splice(index,1);
    toastr.success("task deleted successfully");
  },
  updateEntry(){
    if(this.Description == ""){
      $("#description2").addClass("error");
      this.descriptInfo = "Please enter a valid description";
    } else {
      $("#description1").removeClass("error");
      this.descriptInfo = "";
      this.entries[this.updateIndex].Description = this.Description;
      this.entries[this.updateIndex].Deadline = this.Deadline;
      this.entries[this.updateIndex].Priority = this.Priority;
      toastr.success("task updated successfully");
      this.clear();
      this.closeDialog2();
    }
  },
  },
  computed: {
    list: function(){
      return this.entries.slice();
    }
  }
}
</script>

<style scoped>
#add{
  background-color:#02edf5;
  color: white;
}
.error{
  border-color:#ff30ff
}
.fa-plus{
  color:white;
}
.panel-heading{
  background-color: #3785de;
  border: solid black;
  border-width: 2px;
  color:white;
  padding-left:2em;
}
.panel-primary{
  border:solid black;
  border-width:.5px;
}
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}
.panel-body{
  background-color: white;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
#button{
  background-color: #66ffc2;
}

#toast-container > .toast-success{
  background-color:green;
}
.submitties{
  background-color:#02edf5;
  color:white;
}
.cancelers{
  background-color:red;
  color:white
}
</style>