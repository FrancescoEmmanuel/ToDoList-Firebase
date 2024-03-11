import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/Header';
import TodoModal from '../components/TodoModal';
import TodoList from '../components/TodoList';
import Title from '../components/Title';
import FilterModal from '../components/FilterModal';
import UserProfile from '../components/UserProfile';
import Tab from '../components/Tab';
import { auth, db } from '../Firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

import Sidebar from '../components/Sidebar';


function ToDoPage() {
  const [openModal, setModal] = useState(false);
  const [toDoList, setToDoList] = useState([]);

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({ type: '', completed: '' });
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        console.log()
  
        const q = query(collection(db, 'todos', userId, 'items'));
        const unsubscribeTodos = onSnapshot(q, (querySnapshot) => {
          let todosDb = [];
          querySnapshot.forEach((doc) => {
            todosDb.push({ ...doc.data(), id: doc.id });
          });

          setToDoList(todosDb);
        });

        // Cleanup function to unsubscribe from the to-do list updates when the component unmounts
        return () => {
          unsubscribeTodos();
        };
      } else {
        // Handle when the user is not signed in
        setToDoList([]);
      }
    });
  }, []);

  const applyFilter = (filter) => {
    setFilterOptions(filter);
    setFilterModalOpen(false);
  };

  const handleUpdate = (id) => {
    const selectedItem = toDoList.find((item) => item.id === id);
    setSelectedItem(selectedItem);
    setModal(true);
  };

  const filteredList = () => {
    return toDoList.filter((todo) => {
      const typeFilter =
        filterOptions.type === 'All' ||
        !filterOptions.type ||
        todo.type.toUpperCase() === filterOptions.type.toUpperCase();

      const completedFilter =
        filterOptions.completed === 'All' ||
        filterOptions.completed === '' ||
        todo.completed === filterOptions.completed;

      const dateFilter = () => {
        switch (activeTab) {
          case 'All':
            return todo;
          case 'Today':
            return isToday(new Date(todo.date));
          case 'Tomorrow':
            return isTomorrow(new Date(todo.date));
          case 'Upcoming':
            return isLater(new Date(todo.date));
          case 'Past':
            return isPast(new Date(todo.date));
          default:
            return true;
        }
      };

      return typeFilter && completedFilter && dateFilter();
    });
  };

  function isToday(date) {
    const today = new Date();
    const todayWithoutTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const dateWithoutTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    return (
      dateWithoutTime.getTime() === todayWithoutTime.getTime() &&
      date.getTime() >= today.getTime()
    );
  }

  function isTomorrow(date) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString();
  }

  function isLater(date) {
    const today = new Date();
    return date > today && !isToday(date) && !isTomorrow(date);
  }

  function isPast(date) {
    const today = new Date();
    return date < today;
  }

  const toggleTodo = async (id) => {
    const todo = toDoList.find((item) => item.id === id);
    if (todo) {
      await updateDoc(doc(db, 'todos', auth.currentUser.uid, 'items', id), {
        completed: !todo.completed,
      });
    }
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', auth.currentUser.uid, 'items', id));
  };

  const tabNames = ['All', 'Today', 'Tomorrow', 'Upcoming', 'Past'];

  return (
    <div className="flex items-center justify-center min-w-screen">
      <Sidebar></Sidebar>
  
      <div className="w-[40%] mx-auto my-0">
        <Title>Todo List</Title>
        <div className="max-w-[750px] w-full mx-auto my-0">
          <Header setModal={setModal} setFilterModalOpen={setFilterModalOpen} />

          {/* Tabs */}
          <div className="flex justify-center mt-2 mb-3 text-white">
            <Tab
              tabNames={tabNames}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              space={'space-x-4'}
            />
          </div>

          {/* Display filtered list based on the active tab */}
          <TodoList
            todos={filteredList()}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            title={activeTab}
            handleUpdate={handleUpdate}
          />
          <div className="flex justify-center mt-96 items-center">
            <UserProfile
              name="Francesco Emmanuel Setiawan"
              nim="2602209620"
              profileIcon="src\assets\pas-photo.png"
            />
          </div>

          <TodoModal
            openModal={openModal}
            setModal={setModal}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            userId={auth.currentUser.uid}
          />

          <FilterModal
            isOpen={filterModalOpen}
            closeModal={() => setFilterModalOpen(false)}
            applyFilter={applyFilter}
          ></FilterModal>

       
        </div>
      </div>
    </div>
  );
}

export default ToDoPage;
