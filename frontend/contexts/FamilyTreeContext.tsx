'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface FamilyMember {
    id: string;
    firstName: string;
    lastName: string;
    maidenName?: string;
    birthDate?: string;
    deathDate?: string;
    birthPlace?: string;
    deathPlace?: string;
    gender: 'male' | 'female' | 'other';
    photo?: string;
    email?: string;
    phone?: string;
    address?: string;
    occupation?: string;
    education?: string;
    spouseId?: string;
    parentIds: string[];
    childIds: string[];
    branchId?: string;
    representativeId?: string;
    isAlive: boolean;
    isPrivate: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FamilyBranch {
    id: string;
    name: string;
    description?: string;
    representativeId: string;
    parentBranchId?: string;
    childBranchIds: string[];
    memberIds: string[];
    color: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface FamilyTreeState {
    members: FamilyMember[];
    branches: FamilyBranch[];
    selectedMember: FamilyMember | null;
    selectedBranch: FamilyBranch | null;
    isLoading: boolean;
    error: string | null;
}

type FamilyTreeAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_MEMBERS'; payload: FamilyMember[] }
    | { type: 'SET_BRANCHES'; payload: FamilyBranch[] }
    | { type: 'ADD_MEMBER'; payload: FamilyMember }
    | { type: 'UPDATE_MEMBER'; payload: FamilyMember }
    | { type: 'DELETE_MEMBER'; payload: string }
    | { type: 'ADD_BRANCH'; payload: FamilyBranch }
    | { type: 'UPDATE_BRANCH'; payload: FamilyBranch }
    | { type: 'DELETE_BRANCH'; payload: string }
    | { type: 'SET_SELECTED_MEMBER'; payload: FamilyMember | null }
    | { type: 'SET_SELECTED_BRANCH'; payload: FamilyBranch | null };

const initialState: FamilyTreeState = {
    members: [],
    branches: [],
    selectedMember: null,
    selectedBranch: null,
    isLoading: false,
    error: null,
};

function familyTreeReducer(state: FamilyTreeState, action: FamilyTreeAction): FamilyTreeState {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_MEMBERS':
            return { ...state, members: action.payload };
        case 'SET_BRANCHES':
            return { ...state, branches: action.payload };
        case 'ADD_MEMBER':
            return { ...state, members: [...state.members, action.payload] };
        case 'UPDATE_MEMBER':
            return {
                ...state,
                members: state.members.map(member =>
                    member.id === action.payload.id ? action.payload : member
                ),
            };
        case 'DELETE_MEMBER':
            return {
                ...state,
                members: state.members.filter(member => member.id !== action.payload),
            };
        case 'ADD_BRANCH':
            return { ...state, branches: [...state.branches, action.payload] };
        case 'UPDATE_BRANCH':
            return {
                ...state,
                branches: state.branches.map(branch =>
                    branch.id === action.payload.id ? action.payload : branch
                ),
            };
        case 'DELETE_BRANCH':
            return {
                ...state,
                branches: state.branches.filter(branch => branch.id !== action.payload),
            };
        case 'SET_SELECTED_MEMBER':
            return { ...state, selectedMember: action.payload };
        case 'SET_SELECTED_BRANCH':
            return { ...state, selectedBranch: action.payload };
        default:
            return state;
    }
}

interface FamilyTreeContextType extends FamilyTreeState {
    fetchMembers: () => Promise<void>;
    fetchBranches: () => Promise<void>;
    addMember: (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateMember: (id: string, updates: Partial<FamilyMember>) => Promise<void>;
    deleteMember: (id: string) => Promise<void>;
    addBranch: (branch: Omit<FamilyBranch, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateBranch: (id: string, updates: Partial<FamilyBranch>) => Promise<void>;
    deleteBranch: (id: string) => Promise<void>;
    setSelectedMember: (member: FamilyMember | null) => void;
    setSelectedBranch: (branch: FamilyBranch | null) => void;
    getMemberById: (id: string) => FamilyMember | undefined;
    getBranchById: (id: string) => FamilyBranch | undefined;
    getMembersByBranch: (branchId: string) => FamilyMember[];
    getFamilyMembers: (memberId: string) => {
        parents: FamilyMember[];
        siblings: FamilyMember[];
        children: FamilyMember[];
        spouse: FamilyMember | undefined;
    };
}

const FamilyTreeContext = createContext<FamilyTreeContextType | undefined>(undefined);

export function FamilyTreeProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(familyTreeReducer, initialState);

    const fetchMembers = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await fetch('/api/family/members');
            if (response.ok) {
                const members = await response.json();
                dispatch({ type: 'SET_MEMBERS', payload: members });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch members' });
            }
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Network error' });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const fetchBranches = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await fetch('/api/family/branches');
            if (response.ok) {
                const branches = await response.json();
                dispatch({ type: 'SET_BRANCHES', payload: branches });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch branches' });
            }
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Network error' });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const addMember = async (memberData: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const response = await fetch('/api/family/members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(memberData),
            });
            if (response.ok) {
                const newMember = await response.json();
                dispatch({ type: 'ADD_MEMBER', payload: newMember });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to add member' });
            }
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Network error' });
        }
    };

    const updateMember = async (id: string, updates: Partial<FamilyMember>) => {
        try {
            const response = await fetch(`/api/family/members/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            if (response.ok) {
                const updatedMember = await response.json();
                dispatch({ type: 'UPDATE_MEMBER', payload: updatedMember });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to update member' });
            }
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Network error' });
        }
    };

    const deleteMember = async (id: string) => {
        try {
            const response = await fetch(`/api/family/members/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                dispatch({ type: 'DELETE_MEMBER', payload: id });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to delete member' });
            }
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Network error' });
        }
    };

    const addBranch = async (branchData: Omit<FamilyBranch, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const response = await fetch('/api/family/branches', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(branchData),
            });
            if (response.ok) {
                const newBranch = await response.json();
                dispatch({ type: 'ADD_BRANCH', payload: newBranch });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to add branch' });
            }
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Network error' });
        }
    };

    const updateBranch = async (id: string, updates: Partial<FamilyBranch>) => {
        try {
            const response = await fetch(`/api/family/branches/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            if (response.ok) {
                const updatedBranch = await response.json();
                dispatch({ type: 'UPDATE_BRANCH', payload: updatedBranch });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to update branch' });
            }
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Network error' });
        }
    };

    const deleteBranch = async (id: string) => {
        try {
            const response = await fetch(`/api/family/branches/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                dispatch({ type: 'DELETE_BRANCH', payload: id });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to delete branch' });
            }
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Network error' });
        }
    };

    const setSelectedMember = (member: FamilyMember | null) => {
        dispatch({ type: 'SET_SELECTED_MEMBER', payload: member });
    };

    const setSelectedBranch = (branch: FamilyBranch | null) => {
        dispatch({ type: 'SET_SELECTED_BRANCH', payload: branch });
    };

    const getMemberById = (id: string) => {
        return state.members.find(member => member.id === id);
    };

    const getBranchById = (id: string) => {
        return state.branches.find(branch => branch.id === id);
    };

    const getMembersByBranch = (branchId: string) => {
        return state.members.filter(member => member.branchId === branchId);
    };

    const getFamilyMembers = (memberId: string) => {
        const member = getMemberById(memberId);
        if (!member) return { parents: [], siblings: [], children: [], spouse: undefined };

        const parents = state.members.filter(m => member.parentIds.includes(m.id));
        const children = state.members.filter(m => member.childIds.includes(m.id));
        const spouse = member.spouseId ? getMemberById(member.spouseId) : undefined;

        const siblings = state.members.filter(m =>
            m.id !== memberId &&
            m.parentIds.some(parentId => member.parentIds.includes(parentId))
        );

        return { parents, siblings, children, spouse };
    };

    const value: FamilyTreeContextType = {
        ...state,
        fetchMembers,
        fetchBranches,
        addMember,
        updateMember,
        deleteMember,
        addBranch,
        updateBranch,
        deleteBranch,
        setSelectedMember,
        setSelectedBranch,
        getMemberById,
        getBranchById,
        getMembersByBranch,
        getFamilyMembers,
    };

    return <FamilyTreeContext.Provider value={value}>{children}</FamilyTreeContext.Provider>;
}

export function useFamilyTree() {
    const context = useContext(FamilyTreeContext);
    if (context === undefined) {
        throw new Error('useFamilyTree must be used within a FamilyTreeProvider');
    }
    return context;
} 